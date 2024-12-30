# Location Picker
Working Video:-  https://drive.google.com/file/d/1pMSQyztkrhLzfcDs-s4DtWbBSX6nRlZR/view?usp=sharing
## Overview

This is a web application that allows users to manage their delivery addresses. The application includes features to add, update, delete, and view saved addresses, making it easy to manage multiple addresses like home, office, and more.
![Screenshot 2024-12-30 155417](https://github.com/user-attachments/assets/a040551f-fc72-479b-8eee-fdce1495e647)
![Screenshot 2024-12-30 155447](https://github.com/user-attachments/assets/c32bd122-9c0f-4b1b-8a43-6b54b50c57c6)
![Screenshot 2024-12-30 155507](https://github.com/user-attachments/assets/6f44434f-84fc-455d-bc02-3192a4d8a188)

### Key Features:
- **Add New Address**: Users can add new addresses by selecting a location on a map and filling out address details.
- **Edit Address**: Users can edit existing addresses by clicking on the edit button.
- **Delete Address**: Users can remove addresses they no longer need.
- **Location Access**: The application asks users for location permission and automatically detects their location on the map.
- **Responsive Design**: The app is fully responsive, ensuring it works well on desktop and mobile devices.

---

## Tech Stack

- **Frontend**: 
  - React.js
  - React Router
  - Axios for API requests
  - Google Maps API for location-based features
  - CSS for styling

- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB (NoSQL Database)

- **Deployment**: 
  - Local development environment using `localhost`.

---

## Installation & Setup

### Prerequisites:
1. **Node.js**: Make sure Node.js is installed on your machine.
2. **MongoDB**: Set up MongoDB, either locally or using a service like MongoDB Atlas.
3. **Google Maps API Key**: You’ll need to obtain a Google Maps API key for the location functionality.

### Backend Setup:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/address-management.git
    cd address-management
    ```

2. Install dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Set up MongoDB (local or cloud). Update the connection string in your backend app (likely in `server.js` or `.env` file).

4. Start the backend server:
    ```bash
    npm start
    ```

   The backend will run on `http://localhost:5000`.

### Frontend Setup:

1. Install dependencies:
    ```bash
    cd frontend
    npm install
    ```

2. Set your Google Maps API key in `frontend/src/Home.js` and `frontend/src/EditAddress.js` (replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key):
    ```javascript
    const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY";
    ```

3. Start the frontend:
    ```bash
    npm start
    ```

   The frontend will run on `http://localhost:3000`.

---

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. You will be able to:
   - View your current delivery addresses.
   - Add new addresses with location and category (Home, Office, Friends & Family).
   - Edit and delete existing addresses.
3. To edit an address, click the "Edit" button next to the saved address.
4. To delete an address, click the "Delete" button next to the saved address.

---


