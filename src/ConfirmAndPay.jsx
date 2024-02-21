import React from 'react';
import { Button, Progress, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './ConfirmAndPay.css';
import Header from './Header.jsx';
const ConfirmAndPay = () => {
  return (
    <div className="confirm-and-pay">
      <Header/>
      <h1>Confirm and Pay</h1>
      <Card title="Lease Details">
        <p>Data: Dataset 123</p>
        <p>Access Period: 1 day</p>
        <p>Price: 0.01 ETH</p>
      </Card>
      <Card title="Payment Method">
        <p>Ethereum: ⧫0x786...9D28</p>
        <Button type="dashed" icon={<PlusOutlined />}>
          Add another Payment Method
        </Button>
      </Card>
      <Progress percent={75} showInfo={false} />
      <Button type="primary" size="large">
        Confirm and pay
      </Button>
    </div>
  );
};

export default ConfirmAndPay;
