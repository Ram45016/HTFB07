// App.js

import React from 'react';
import './MyForm.css';
import Navbar from './NavBar.js'; // Import the Navbar component

function StudentForm() {
  const formCategories = [
    "Total Carbon Emissions (tCO2e)",
    "Emissions by Category (tCO2e)",
    "Emissions by Scope (tCO2e)",
    "Emissions by Gas (tCO2e)",
    "Emissions by Country (tCO2e)"
  ];

  const supplierLabels = ["Supplier A", "Supplier B", "Supplier C", "Supplier D"];

  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <div className="student-form-container">
        <h1>CARBON EMISSIONS</h1>
        <div className="student-forms">
          {formCategories.map((category, index) => (
            <div key={index} className="student-form">
              <h2>{category}</h2>
              <form>
                {supplierLabels.map((supplier, subIndex) => (
                  <div key={subIndex} className="form-group">
                    <label htmlFor={`${supplier}${index}`}>{supplier}:</label>
                    {supplier === "Supplier D" ? (
                      <textarea id={`${supplier}${index}`} name={`${supplier}${index}`} />
                    ) : (
                      <input type="text" id={`${supplier}${index}`} name={`${supplier}${index}`} />
                    )}
                  </div>
                ))}
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
