import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

const ManageAddresses = () => {
  const [addresses, setAddresses] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/addresses")
      .then((response) => {
        setAddresses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching addresses", error);
      });
  }, []);


  const handleDeleteAddress = (id) => {
    axios
      .delete(`http://localhost:5000/api/addresses/${id}`)
      .then((response) => {
        setAddresses(addresses.filter((address) => address._id !== id));
        alert("Address deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting address", error);
      });
  };

  return (
    <div>
      <h1>Manage Your Addresses</h1>

      <h2>Saved Addresses</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address._id}>
            <p>{address.houseNo}, {address.area} ({address.category})</p>
            <Link to={`/edit-address/${address._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDeleteAddress(address._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAddresses;
