import React, { useState } from 'react';
import IpfsHttpClient from 'ipfs-http-client'; // Import ipfs-http-client for client-side upload

const client = IpfsHttpClient.create({ url: 'https://api.lighthouse.storage' }); // Initialize IPFS client

function App() {
  const [configFile, setConfigFile] = useState(null);
  const [filesToUpload, setFilesToUpload] = useState([]);

  const handleConfigFileChange = (event) => {
    setConfigFile(event.target.files[0]);
  };

  const handleFileRead = async (file) => {
    const content = await file.text();
    const fileLines = content.split('\n').filter(line => line.trim() !== ''); // Assuming each line contains a file path
    setFilesToUpload(fileLines);
  };

  const uploadFiles = async () => {
    if (!configFile) {
      console.error('Please select a configuration file');
      return;
    }

    if (filesToUpload.length === 0) {
      console.error('No files to upload specified in the configuration file');
      return;
    }

    try {
      for (const filePath of filesToUpload) {
        const fileContent = await fetch(filePath).then(res => res.text()); // Fetch file content
        const cid = await client.add(fileContent); // Upload to IPFS
        console.log(`File uploaded to IPFS: ${cid.path}`);
        // Now you have the CID to proceed to the next step
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleConfigFileUpload = async () => {
    if (!configFile) {
      console.error('Please select a configuration file');
      return;
    }

    try {
      await handleFileRead(configFile);
      await uploadFiles();
    } catch (error) {
      console.error('Error handling configuration file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleConfigFileChange} />
      <button onClick={handleConfigFileUpload}>Upload Files from Config</button>
    </div>
  );
}

export default App;
