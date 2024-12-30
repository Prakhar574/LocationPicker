
import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Home from "./Pages/Home";
import ManageAddress from "./Pages/AddressManagement";
import EditAddress from "./Pages/EditAddress";



function App() {
  return (
   
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/edit-address/:id" element={<EditAddress />} />
      <Route path="/manage-address" element={<ManageAddress />} />
    </Routes>

  );
}

export default App;
