##SocialSynced

Website URL: [SocialSynced](https://4436-i4eo.vercel.app/index.html)

credentials: 
email: prachi1@gmail.com
password: secret0000

SocialSynced is a web platform designed to connect people through their shared interests and help them plan memorable dates. Whether you want to network, make new friends, or find someone special, SocialSynced provides a space for meaningful connections.

#Features

User Authentication: Secure login and registration system.

Profile Management: Users can create and update their profiles.

Interest-Based Connections: Discover people with similar interests.

Planning Dates: Organize meetups and events with ease.

Interactive Network: Explore and expand your social network.

Places Recommendation: Get suggestions for places to visit.

Project Structure

#Backend

The backend is implemented in Node.js and handles user authentication, profile management, and other core functionalities.

backend/
├── src/
│ ├── config/
│ │ └── database.js # Database configuration file
│ ├── controller/
│ │ └── auth.controller.js # Controller for authentication logic
│ ├── middleware/
│ │ ├── auth.js # Middleware for authentication
│ │ └── cloudinary.service.js # Service for image uploads
│ ├── models/
│ │ ├── Profile.js # Schema for user profiles
│ │ └── User.js # Schema for user data
│ ├── routes/
│ │ ├── auth.route.js # Routes for authentication
│ │ └── profile.route.js # Routes for profile operations
├── app.js # Main entry point for the backend
├── package.json # Backend dependencies and scripts
├── package-lock.json # Backend lock file
├── vercel.json # Deployment configuration for Vercel

#Frontend

The frontend is built with HTML, CSS, and JavaScript, providing an intuitive and responsive user interface.

`frontend/
├── assets/
│   └── logo.jpg            # Logo used in the project
├── pages/
│   ├── connection.html     # Connections page
│   ├── home.html           # Homepage
│   ├── login.html          # Login page
│   ├── logout.html         # Logout page
│   ├── network.html        # Network page
│   ├── places.html         # Places recommendation page
│   ├── placesProxy.html    # Proxy page for places
│   ├── profile.html        # Profile page
│   ├── profilepage.html    # Alternate profile page
│   ├── templete.html       # Template file
│   └── userDetails.html    # User details page
├── script/
│   ├── Scanner.js          # Script for scanning functionality
│   ├── auth.js             # Script for authentication
│   └── condition.js        # Script for conditional logic
├── styles/
│   └── (CSS files)         # Stylesheets for the project
├── Invitations.html         # Invitation page
├── index.css                # Main stylesheet
├── index.html               # Main entry point for the frontend
├── README.md                # Project documentation`

#Deployment

The project is deployed on Vercel, ensuring a smooth and reliable user experience. The deployment configuration can be found in vercel.json.

#How to Run the Project Locally

Prerequisites

Node.js installed on your system

A MongoDB instance for the database

#Steps

Clone the repository:

git clone <https://github.com/syedamaan7733/4436.git>

Navigate to the backend directory and install dependencies:

cd backend
npm install

Start the backend server:

npm start or npm run dev

Open the frontend folder and launch the index.html file in your browser.

#Contributing

We welcome contributions to improve SocialSynced! Feel free to submit issues or pull requests for enhancements or bug fixes.

#Walkthrough Picture

![Login Page for Authentication](image.png)
![Landing Page](image-1.png)
![Profle Img](image-3.png)
![Connection](image-4.png)
![Discover](image-5.png)

License

This project is licensed under the MIT License. See the LICENSE file for details.
