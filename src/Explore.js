import React from 'react';
import { Card, Row, Col } from 'antd';
import "./Explore.css"
import image11 from './Image11.jpeg';
import image10 from './Image10.jpeg';
import image9 from './Image9.jpeg';
import image8 from './Image8.jpeg';
import image7 from './Image7.jpeg';
import image6 from './Image6.jpeg';
//import SideBar from './SideBar';
import Header from './Header';

const Explore = () => {
  return (
    <div className="data-leasing">
        {/* <SideBar/> */}
        <Header/>
      {/* <div className="nav-bar">
        <h1 style={{color:"black"}}>DataLeasing</h1>
        
      </div> */}
      <div className="page-title">
        <h2 style={{color:"black"}}>Explore Datasets</h2>
      </div>
      <div className="newest-datasets">
        <h3>WELCOME!</h3>
        <Row gutter={16}>
    <Col span={6}>
        <Card title="Credit" bordered={false}>
            <p>$10,000</p>
        </Card>
    </Col>
    <Col span={6}>
        <Card title="Due" bordered={false}>
            <p>$5,000</p>
        </Card>
    </Col>
    <Col span={6}>
        <Card title="Duration" bordered={false}>
            <p>1 month</p>
        </Card>
    </Col>
    <Col span={6}>
        <Card title="Status" bordered={false}>
            <p>Pending</p>
        </Card>
    </Col>
</Row>
<div className="payment-section" style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
    <div style={{ marginRight: "20px" }}>
        <p >Pay Your Due</p>
        <input type="text" placeholder="Enter your value" />
        <button type="primary" style={{ marginLeft: "20px" }}>Submit</button>
    </div>
    <div style={{ padding: "100px", marginLeft: "auto", marginRight: 0 }}>
    <p>Credit Your Account</p>
    <input type="text" placeholder="Enter your value" style={{ marginLeft: "20px" }} />
    <button type="primary" style={{ marginLeft: "20px" }}>Submit</button>
</div>



</div>

      </div>
      <div className="most-popular">
        <h3>Most Popular</h3>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="US household income by zip code" bordered={false}>
              <img src={image9} alt="US household income by zip code" />
              <p>$15,000 per month</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Real-time stock prices" bordered={false}>
              <img src={image10} alt="Real-time stock prices" />
              <p>$12,000 per month</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Global weather patterns" bordered={false}>
              <img src={image11} alt="Global weather patterns" />
              <p>$8,000 per month</p>
            </Card>
          </Col>
        </Row>
        
        </div>
        {/* </SideBar> */}
    </div> 
  );
};

export default Explore;
