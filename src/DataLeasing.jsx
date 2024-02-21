import React from 'react';
import { Button, Card } from 'antd';
import "./DataLeasing.css"
import image1 from './Image1.jpeg';
import image2 from './Image2.jpeg';
import image3 from './Image3.jpeg';
import image4 from './Image4.jpeg';
import image5 from './Image5.jpeg';
import{Link} from "react-router-dom";
import Header from './Header.jsx';
const DataLeasing = () => {
  return (
    <div className="data-leasing">
        <Header/>
      <div className="nav-bar">
        <h1>DataLeasing</h1>
        <ul>
          <li>How It Works</li>
          <li>Marketplace</li>
          <li>Docs</li>
          <li>Community</li>
        </ul>
      </div>
      <div className="main-header">
        <div className="header-text">
          <h2>Powering the next generation of AI with on-chain data</h2>
          <div className="header-buttons">
            <Link to="/UploadDataset"><Button type="primary">Upload Dataset</Button></Link>
            <Button type="default">Browse Marketplace</Button>
          </div>
        </div>
        <div className="header-image">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/879c59556370ab0313d1027990c19ded382f9696cf9c3739139faac6eb7fa77b?apiKey=0f2bc224482e40a08e704b8e04b2fddd&width=2000" alt="Tree illustration" width="200" height="120"/>
        </div>
      </div>
      <div className="how-it-works">
        <h3>How it works</h3>
        <div className="steps">
          <Card title="Upload your dataset" bordered={false}>
          <img src={image1} alt="Tree illustration" />
            <p>Upload your dataset to the DataLeasing platform and set a price</p>
          </Card>
          <Card title="Get paid for your data" bordered={false}>
          <img src={image5} alt="Tree illustration" />
            <p>Get paid for your data when it's leased by users of other projects</p>
          </Card>
          <Card title="Data is leased on-chain" bordered={false}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/68d9b91eb89eb7e7015efe442cf81577e058d85f08431382decefb3542bb87cd?apiKey=0f2bc224482e40a08e704b8e04b2fddd&width=2000" alt="Image 3" />
            <p>Data is leased on-chain, meaning it's stored on the Ethereum blockchain!</p>
          </Card>
        </div>
      </div>
      <div className="featured-datasets">
        <h3>Featured Datasets</h3>
        <div className="datasets">
          <Card title="Mushroom Classification" bordered={false}>
          <img src={image4} alt="Tree illustration" />
            <p>10,000 labeled images of mushrooms</p>
          </Card>
          <Card title="Bitcoin Price Data" bordered={false}>
            {/* <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e878edb5563c955b19af1c382326ba07ba9e4bde69ebd3edb7e4bd1c4b0fe92?apiKey=0f2bc224482e40a08e704b8e04b2fddd&width=2000" alt="Image 5" /> */}
            <img src={image2} alt="Tree illustration" />
            <p>Historical bitcoin price data</p>
          </Card>
          <Card title="Real Estate Listings" bordered={false}>
          <img src={image3} alt="Tree illustration" />
            <p>Listings for real estate properties</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataLeasing;
