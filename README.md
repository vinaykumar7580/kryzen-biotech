# PDF Builder App

## Overview
PDF Builder is a user-friendly application designed to streamline the registration, login, and data input process. With this app, users can manage their personal information. The intuitive interface allows users to preview their entered data and download it in a PDF format.

## Features
- **User Registration and Login:** Create an account and log in securely.
- **Easy Data Input:** Input and manage personal details such as name, age, address, and photo.
- **PDF Preview and Download:** Seamlessly preview your data and download it in a sleek PDF format.

## Basic Structure

### Frontend
For the frontend, we've created a React application utilizing various libraries such as `react-router-dom`, `chakra-ui`, `html2pdf`, and `axios`.

#### Register Page
- Users can register by entering a username and password.
- The `handleChange` function updates the `formData` values.
- The `handleSubmit` function facilitates form submission and makes a POST request for user registration using Axios.

#### Login Page
- Users can log in by entering their credentials.
- Similar to the Register Page, the `handleChange` and `handleSubmit` functions handle form interactions and login requests.

#### Home Page
- Displays the application logo and the current user's username on the navbar.
- User profile image opens a popup with a logout button.
- Clicking logout removes the token from local storage, redirecting the user to the login page.
- Features a data form for user input (name, age, address, photo).
- User-added data is rendered in a table with ID, name, age, address, image, and preview button.
- Clicking the preview button redirects the user to the preview page.

#### Preview Page
- Navbar with heading, home, and download buttons.
- Home button redirects to the home page; download button generates and downloads a PDF of the content in the box below.
- Functions like `handleDataDetails`, `convertToBase64`, and `handleDownload` manage data retrieval, image conversion, and PDF generation.

### Backend
For the backend, a Node.js application was created using libraries such as `nodemon`, `cors`, `express`, `mongoose`, `jsonwebtoken`, `bcrypt`, `multer`, and `dotenv`. used `mongodb` database for data storing.

#### index.js File
- Utilizes Multer as middleware for handling file uploads, storing images in the `uploads` directory.
- Serves static files to the frontend using `express.static` middleware.
- Defines models (`RegisterModel` and `DataModel`) for user registration and data storage.
- Defines routes for user registration/login and data handling.

#### register.routes.js File
- Handles the `/register` route for user registration data storage.
- Manages the `/login` route for user login, generating a token with `jsonwebtoken`.
- Provides user details with the `/userdata` route.

#### data.routes.js File
- Manages the `/get-data` route for retrieving user-specific data.
- Handles the `/get-data-details` route for fetching detailed data using data `_id`.


## Getting Started

1. **Frontend Installation:**
    - Clone the repository.
    - Install dependencies using `npm install`.
    - Run the application with `npm start`.

2. **Backend Installation:**
    - Navigate to the `backend` directory.
    - Install dependencies using `npm install`.
    - Start the server with `npm run server`.

3. **Configuration:**
    - Ensure MongoDB is running.
    - Create a `.env` file with the MongoDB URL.

4. **Contributing:**
    - Fork the repository.
    - Make your changes.
    - Submit a pull request.




