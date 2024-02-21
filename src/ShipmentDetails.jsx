import React, { Component } from 'react';
//import ShipmentDetails from './ShipmentDetails';

class ShipmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipment: {
        id: 1,
        shipmentId: "",
        origin: "",
        destination: "",
        shipper: "",
        consignee: "",
        shipDate: "",
        estimatedDeliveryDate: "",
        carrier: "",
        modeOfTransportation: "",
        weight: 0,
        dimensions: "",
        contents: "",
        value: 0,
        trackingNumber: "",
        proofOfDelivery: "",
        carbonFootprint: 0,
        deliveryStatus: "",
        checkpoints: []
      }
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      shipment: {
        ...prevState.shipment,
        [name]: value
      }
    }));
  }

  render() {
    const { shipment } = this.state;

    return (
      <div>
        <h1>Enter Shipment Details</h1>
        <div>
          <label>Shipment ID: </label>
          <input type="text" name="shipmentId" value={shipment.shipmentId} onChange={this.handleChange} />
        </div>
        <div>
          <label>Origin: </label>
          <input type="text" name="origin" value={shipment.origin} onChange={this.handleChange} />
        </div>
        <div>
          <label>Destination: </label>
          <input type="text" name="destination" value={shipment.destination} onChange={this.handleChange} />
        </div>
        <div>
          <label>Shipper: </label>
          <input type="text" name="shipper" value={shipment.shipper} onChange={this.handleChange} />
        </div>
        {/* Add more input fields for the remaining attributes */}
        <ShipmentDetails shipment={shipment} />
      </div>
    );
  }
}

export default ShipmentDetails;
