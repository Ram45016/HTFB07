import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DataLeasing from './DataLeasing';
import reportWebVitals from './reportWebVitals';
import MyForm from './SupplyChain';
import ShipmentDetails from './ShipmentDetails';
import Orders from './Orders';
import Product from './Product';
import UploadDataset from './UploadDataset';
import ConfirmAndPay from './ConfirmAndPay';
import DataLease from './DataLease';
import Explore from './Explore';
import LeasedData from './LeasedData';
import{BrowserRouter as Router,Routes,Route} from "react-router-dom";
//import SideBar from './SideBar';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Router>
    
        <Routes>
            <Route path="/" element={<MyForm/>}></Route>
            <Route path="/ShipmentDetails" element={<ShipmentDetails/>}></Route>
            <Route path="/Orders" element={<Orders/>}></Route>
            <Route path='/Product' element={<Product/>}></Route>
            <Route path="/UploadDataset" element={<UploadDataset/>}></Route>
            <Route path='/ConfirmAndPay' element={<ConfirmAndPay/>}></Route>
            <Route path="/DataLeasing" element={<DataLeasing/>}></Route>
            <Route path="/DataLease" element={<DataLease/>}></Route>
            <Route path="/Explore" element={<Explore/>}></Route>
            <Route path="/LeasedData" element={<LeasedData/>}></Route>
        </Routes>
        
     </Router>
     
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
