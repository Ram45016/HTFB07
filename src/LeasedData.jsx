import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import "./LeasedData.css";
import Header from './Header.jsx';
import { ethers } from 'ethers';

const LeasedData = () => {
  const [uploadsData, setUploadsData] = useState([]);

  useEffect(() => {
    async function fetchUploadsData() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = '0x737B119302834786891429426A8848710371645f';
      const contractABI = [
        {
          "inputs": [],
          "name": "getAllUploads",
          "outputs": [
            {
              "internalType": "string[]",
              "name": "allCids",
              "type": "string[]"
            },
            {
              "internalType": "address[]",
              "name": "allLeasers",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }];

      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const { allCids, allLeasers } = await contract.getAllUploads();
        // Process the data
        const data = allCids.map((cid, index) => ({
          cid: cid,
          leaser: allLeasers[index],
          imageUrl: `https://gateway.lighthouse.storage/ipfs/${cid}` // Construct the URL for each CID
        }));
        setUploadsData(data);
      } catch (error) {
        console.error('Error fetching uploads data:', error);
      }
    }

    fetchUploadsData();
  }, []);

  return (
    <div className="leased-data">
      <Header />
      <div className="main-content">
        <Button type="primary">New Lease</Button>
        <div className="active-leases">
          {uploadsData.map((upload, index) => (
            <Card key={index} title="Active Lease" bordered={false}>
              <p><strong>CID: </strong>{upload.cid}</p>
              <p><strong>Leaser: </strong>{upload.leaser}</p>
              </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeasedData;
