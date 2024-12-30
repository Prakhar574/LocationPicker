import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditAddress.css"; // Importing the CSS file for styling

const EditAddress = () => {
  const { id } = useParams(); // Get the address ID from the URL
  const navigate = useNavigate();
  const [houseNo, setHouseNo] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("Home");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to handle fetch time

  // Fetch the address details by ID
  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    axios
      .get(`http://localhost:5000/api/addresses/${id}`)
      .then((response) => {
        const address = response.data;
        setHouseNo(address.houseNo);
        setArea(address.area);
        setCategory(address.category);
        setLat(address.lat);
        setLng(address.lng);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching address details", error);
        setLoading(false); // Set loading to false even in case of an error
      });
  }, [id]);

  // Handle address update
  const handleUpdateAddress = () => {
    const updatedAddress = {
      houseNo,
      area,
      category,
      lat,
      lng,
    };

    axios
      .put(`http://localhost:5000/api/addresses/${id}`, updatedAddress)
      .then((response) => {
        alert("Address updated successfully!");
        navigate("/home"); // Redirect back to the home page after update
      })
      .catch((error) => {
        console.error("Error updating address", error);
      });
  };

  // If still loading, show loading message
  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="edit-address-container">
      <h1>Edit Address</h1>
      <form className="address-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="House/Flat/Block No."
          value={houseNo}
          onChange={(e) => setHouseNo(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Apartment/Road/Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="input-field"
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="input-field"
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Friends & Family">Friends & Family</option>
        </select>
        <button className="update-btn" onClick={handleUpdateAddress}>
          Update Address
        </button>
      </form>
    </div>
  );
};

export default EditAddress;
