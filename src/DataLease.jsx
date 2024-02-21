import React from 'react';
import './DataLease.css';
import Header from './Header.jsx';
import { ethers } from 'ethers'; // Import ethers.js library

class DataLease extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLeasingItem: '', // State for selected leasing item
      fee: '', // State for fee
      duration: '1 day', // State for duration
      contract: null, // Contract instance
      leasingItems: [] // State for leasing items (CIDs)
    };
  }

  componentDidMount() {
    this.initContract();
    this.fetchLeasingItems();
  }

  // Initialize the contract instance
  async initContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // Assuming web3 is already injected by your provider (e.g., MetaMask)
    const signer = provider.getSigner(); // Get signer from provider

    // Replace CONTRACT_ADDRESS and CONTRACT_ABI with your contract's address and ABI
    const contractAddress = '0x737B119302834786891429426A8848710371645f'; // Your contract address
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
      "name": "leasing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        }
      ],
      "name": "getLeaseDetails",
      "outputs": [
        {
          "internalType": "address",
          "name": "leaser",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "payment",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }, {
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

    const contract = new ethers.Contract(contractAddress, contractABI, signer); // Create contract instance

    this.setState({ contract });
  }

  // Fetch all leasing items (CIDs) from the contract
  async fetchLeasingItems() {
    const { contract } = this.state;
    if (contract) {
      try {
        // Call the contract method to get all CIDs
        const { allCids } = await contract.getAllUploads();
        this.setState({ leasingItems: allCids });
      } catch (error) {
        console.error('Error fetching leasing items:', error);
      }
    } else {
      console.error('Contract not initialized.');
    }
  }

  // Handler for selecting leasing item
  handleLeasingItemChange = (event) => {
    const selectedLeasingItem = event.target.value;
    // Set fee and duration based on selected item
    let fee = '';
    let duration = '';
    this.setState({
      selectedLeasingItem,
      fee,
      duration
    });
  }

  // Handler for lease button click
  handleLeaseNowClick = async () => {
    const { contract, selectedLeasingItem, fee, duration } = this.state;
    if (contract) {
      try {
        // Call the contract method to lease the data
        const tx = await contract.leasing(selectedLeasingItem, fee, duration);
        await tx.wait(); // Wait for transaction to be mined
        console.log('Data leased successfully!');
        // Add further logic as needed
      } catch (error) {
        console.error('Error leasing data:', error);
      }
    } else {
      console.error('Contract not initialized.');
    }
  }

  render() {
    const { leasingItems, selectedLeasingItem, fee, duration } = this.state;

    return (
      <div className="container">
        <Header />
        <div className="form">
          <h1>DataLeasing</h1>
          <label htmlFor="leasingItem">Leasing Item:</label>
          <select id="leasingItem" value={selectedLeasingItem} onChange={this.handleLeasingItemChange}>
            <option value="">Select</option>
            {leasingItems.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <label htmlFor="fee">Fee:</label>
          <input type="text" id="fee" value={fee} readOnly />

          <label htmlFor="duration">Duration:</label>
          <input type="text" id="duration" value={duration} readOnly />

          <button className="lease" onClick={this.handleLeaseNowClick}>Lease Now</button>
        </div>
      </div>
    );
  }
}

export default DataLease;
