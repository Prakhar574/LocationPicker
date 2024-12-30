import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import { Link } from "react-router-dom"; 
import './home.css'
const Home = () => {
  const [location, setLocation] = useState(null); 
  const [selectedLocation, setSelectedLocation] = useState(null); 
  const [isLocationAllowed, setIsLocationAllowed] = useState(false); 
  const [isPopupVisible, setIsPopupVisible] = useState(false); 
  const [houseNo, setHouseNo] = useState(""); 
  const [area, setArea] = useState(""); 
  const [category, setCategory] = useState("Home"); 
  const [addresses, setAddresses] = useState([]); 
  const [selectedMarker, setSelectedMarker] = useState(null); 

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocationAllowed(true);
          setIsPopupVisible(false); 
        },
        (error) => {
          alert("Location permission denied.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleSaveAddress = () => {
    if (!selectedLocation || !houseNo || !area) {
      alert("Please fill in all fields and select a location.");
      return;
    }
    const newAddress = {
      houseNo,
      area,
      category,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    };
    axios
      .post("http://localhost:5000/api/addresses", newAddress)
      .then((response) => {
        setAddresses([...addresses, response.data]);
        alert("Address saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving address", error);
      });
  };

  const fetchSavedAddresses = () => {
    axios
      .get("http://localhost:5000/api/addresses")
      .then((response) => {
        setAddresses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching addresses", error);
      });
  };

  useEffect(() => {
    fetchSavedAddresses();
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

  useEffect(() => {
    if (isLocationAllowed) {
      setSelectedLocation(location);
    }
  }, [isLocationAllowed, location]);

  return (
    <div className="home-container">
      <h1 className="page-title">Select Your Delivery Location</h1>

      {isPopupVisible && (
        <div className="popup">
          <p>Please enable location access to see your current location.</p>
          <button className="btn" onClick={getCurrentLocation}>Enable Location</button>
          <button className="btn secondary" onClick={() => setIsPopupVisible(false)}>Search Manually</button>
        </div>
      )}

      <LoadScript googleMapsApiKey="AIzaSyCyj16hluiXAxW87HLu98ckix-UOKx1FN8">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedLocation || { lat: 51.505, lng: -0.09 }}
          zoom={13}
          onClick={handleMapClick}
        >
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              onClick={() => setSelectedMarker(selectedLocation)}
            />
          )}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h3>Selected Location</h3>
                <p>Latitude: {selectedMarker.lat}</p>
                <p>Longitude: {selectedMarker.lng}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <div className="location-actions">
        <button className="btn" onClick={() => setIsPopupVisible(true)}>Locate Me</button>
      </div>

      <div className="address-form">
        <h2>Enter Delivery Address</h2>
        <input
          className="input"
          type="text"
          placeholder="House/Flat/Block No."
          value={houseNo}
          onChange={(e) => setHouseNo(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Apartment/Road/Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <select className="input" onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Friends & Family">Friends & Family</option>
        </select>
        <button className="btn" onClick={handleSaveAddress}>Save Address</button>
      </div>

      <h2>Saved Addresses</h2>
      <ul className="address-list">
        {addresses.map((address) => (
          <li key={address._id} className="address-item">
            <p>{address.houseNo}, {address.area} ({address.category})</p>
            <Link to={`/edit-address/${address._id}`}>
              <button className="btn secondary">Edit</button>
            </Link>
            <button className="btn delete" onClick={() => handleDeleteAddress(address._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="manage-address">
        <Link to="/manage-address">
          <button className="btn">Manage Address</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
