import React, { useState } from 'react';
import { Input, Button, Steps } from 'antd';
import "./UploadDataset.css";
import Header from './Header';
import lighthouse from '@lighthouse-web3/sdk'; // Import lighthouse
import { ethers } from 'ethers'; // Import ethers.js library

const { Step } = Steps;

const UploadDataset = () => {
  const [fee, setFee] = useState("");
  const [duration, setDuration] = useState("");

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
    console.log(percentageDone)
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum); // Assuming web3 is already injected by your provider (e.g., MetaMask)
  const signer = provider.getSigner(); // Get signer from provider

  // Replace CONTRACT_ADDRESS and CONTRACT_ABI with your contract's address and ABI
  const contractAddress = '0x737B119302834786891429426A8848710371645f';
  const contractABI = [{
    "inputs": [
      {
        "internalType": "string",
        "name": "_cid",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_duration",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_payment",
        "type": "uint256"
      }
    ],
    "name": "uploadLease",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }];

  const contract = new ethers.Contract(contractAddress, contractABI, signer); // Create contract instance

  const uploadFile = async (file) => {
    // Push file to lighthouse node and get CID
    const output = await lighthouse.upload(file, "42ca7f0f.0210718d390a4cbd8581796f0a9ae3de", false, null, progressCallback);
    const uploadedCID = output.data.Hash;
    window.uploadedCID = uploadedCID;
    console.log('File Status:', output);
    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + uploadedCID);
  }
  
  const handleUpload = async () => {
    const uploadedCID =  window.uploadedCID;
    const tx = await contract.uploadLease(uploadedCID, duration, fee);
    await tx.wait(); // Wait for transaction to be mined
    console.log('Lease uploaded successfully!');
  }

  return (
    <div className="upload-dataset">
      <Header />
      <div className="content">
        <h2>Upload a new dataset</h2>
        <form>
          <label>Upload Files</label>
          <Input type="file" onChange={(e) => uploadFile(e.target.files)} />
          <label>Fee</label>
          <Input placeholder="Enter the fee" value={fee} onChange={(e) => setFee(e.target.value)} />
          <label>Lease Duration (months)</label>
          <Input placeholder="Enter the duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <div className="buttons">
            <Button type="primary" onClick={handleUpload}>Upload</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDataset;
