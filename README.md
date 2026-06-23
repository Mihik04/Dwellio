# 🏡 Dwellio

> A full-stack property listing and rental platform where users can discover, list, and review unique stays across the world.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)


---

## 🌐 Overview

**Dwellio** is a full-stack web application that allows users to browse property listings, post their own accommodations, leave reviews with star ratings, and interact with an interactive map showing listing locations. Built with a focus on clean architecture, security, and user experience.

---

## ✨ Features

### 🏠 Listings
- Create, Read, Update, and Delete (CRUD) property listings
- Image upload with cloud storage via **Cloudinary**
- Interactive map with geocoding via **Mapbox**
- Tax switch toggle for transparent pricing
- Search and filter UI for listings

### ⭐ Reviews
- Star rating system (1–5 stars)
- Create and delete reviews on listings
- Validation to prevent abuse

### 👤 Authentication & Authorization
- User registration and login with **Passport.js** (Local Strategy)
- Session-based authentication with **Express Sessions**
- Route protection — only listing owners can edit/delete their listings
- Only review authors can delete their own reviews

### 🛡️ Security & UX
- Server-side and client-side form validation
- Flash messages for success and error feedback
- Custom error handling with descriptive error pages
- Signed cookies and secure sessions

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Templating** | EJS with ejs-mate layouts |
| **Authentication** | Passport.js (Local Strategy) |
| **Session Management** | express-session, connect-mongo |
| **Flash Messages** | connect-flash |
| **Image Storage** | Cloudinary + Multer |
| **Maps & Geocoding** | Mapbox GL JS |
| **Validation** | Joi (server-side), HTML5 (client-side) |
| **Routing** | Express Router |
| **Styling** | Bootstrap 5, Custom CSS |

---

## 🏗 Architecture

This project follows the **MVC (Model-View-Controller)** design pattern for a clean separation of concerns:

```
MajorProject/
├── controllers/        # Business logic (listings, reviews, users)
├── models/             # Mongoose schemas (Listing, Review, User)
├── routes/             # Express Router (listings, reviews, users)
├── views/              # EJS templates
│   ├── layouts/        # Boilerplate layout (ejs-mate)
│   ├── listings/       # Listing pages (index, show, new, edit)
│   ├── users/          # Auth pages (login, signup)
│   └── includes/       # Partials (navbar, footer, flash)
├── public/             # Static assets (CSS, JS)
├── utils/              # Utility helpers (ExpressError, wrapAsync)
├── middleware.js        # Custom middleware (auth, validation, authorization)
├── app.js              # Main Express application
└── schema.js           # Joi validation schemas
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Cloudinary account
- Mapbox account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Mihik04/Dwellio.git
cd Dwellio

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below)
touch .env

# 4. Seed the database (optional)
node init/index.js

# 5. Start the server
node app.js
```

Visit `http://localhost:3000` in your browser.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following:

```env
# MongoDB
ATLASDB_URL=your_mongodb_connection_string

# Session
SECRET=your_session_secret

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox
MAP_TOKEN=your_mapbox_public_token
```

> ⚠️ Never commit `.env` to version control.

---

## 📁 Project Structure

```
├── controllers/
│   ├── listings.js       # CRUD logic for listings
│   ├── reviews.js        # CRUD logic for reviews
│   └── users.js          # Auth logic (signup, login, logout)
├── models/
│   ├── listing.js        # Listing schema with image & geometry
│   ├── review.js         # Review schema with rating
│   └── user.js           # User schema via passport-local-mongoose
├── routes/
│   ├── listing.js        # /listings routes
│   ├── review.js         # /listings/:id/reviews routes
│   └── user.js           # /login, /signup, /logout routes
├── views/
│   ├── layouts/boilerplate.ejs
│   ├── listings/         # index, show, new, edit
│   └── users/            # login, signup
├── public/
│   ├── css/              # Custom stylesheets
│   └── js/               # Client-side validation script
├── utils/
│   ├── ExpressError.js   # Custom error class
│   └── wrapAsync.js      # Async error wrapper
├── init/
│   ├── data.js           # Seed data
│   └── index.js          # DB seeding script
├── middleware.js          # isLoggedIn, isOwner, isReviewAuthor, validateListing
├── schema.js             # Joi validation schemas
├── app.js                # Entry point
└── package.json
```

---


## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Mihik Sarkar**  


---

> Built as part of a full-stack web development course — covering backend fundamentals, authentication, cloud integration, and interactive maps.
