# Restaurant Management API (Assignment 3)

A RESTful API to manage Restaurants, Menu Items, and User Authentication built with **Node.js**, **Express.js**, **JWT (JSON Web Tokens)**, **bcryptjs**, and **MongoDB (Mongoose)**.

---

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL Database
- **Mongoose** - Object Data Modeling (ODM) library for MongoDB
- **bcryptjs** - Password hashing library
- **jsonwebtoken (JWT)** - Authentication token generation & verification
- **cors** - Cross-Origin Resource Sharing middleware

---

## 📁 Project Architecture

```
Restaurant-Management-API/
├── config/
│   └── db.js                 # MongoDB connection handler
├── models/
│   ├── User.js               # Mongoose schema for Users (bcrypt hashed passwords)
│   ├── Restaurant.js         # Mongoose schema for Restaurants
│   └── MenuItem.js           # Mongoose schema for Menu Items (ref to Restaurant)
├── routes/
│   ├── authRoutes.js         # Routes + Logic for Authentication & Welcome (/, /register, /login)
│   ├── restaurantRoutes.js   # Routes + Logic for Restaurants & Menus (/restaurants, /restaurants/top, etc.)
│   └── menuRoutes.js         # Routes + Logic for Direct Menu Item updates/deletions (/menu/:id)
├── package.json              # Dependencies and scripts configuration
├── server.js                 # Express app, middlewares (Logger, Auth, Error Handlers), & Server startup
└── README.md                 # Project documentation
```

---

## ⚙️ Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server

- **Development Mode** (with auto-reload via nodemon):
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

The server runs by default on port `5000`.

---

## 🔑 Authentication Flow (JWT)

1. **User Registration** (`POST /register`):
   - Accepts `username`, `email`, and `password`.
   - Hashes password using `bcryptjs` before saving to MongoDB.
   - Returns a JWT token upon successful registration.
2. **User Login** (`POST /login`):
   - Accepts `email` and `password`.
   - Verifies credentials using `bcrypt.compare`.
   - Returns a JWT token.
3. **Accessing Protected Routes**:
   - Client must attach the token in request headers:
     ```
     Authorization: Bearer <YOUR_JWT_TOKEN>
     ```

---

## 📑 API Endpoints Summary

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| **GET** | `/` | ❌ No | Welcome route (`Welcome to Restaurant APIs`) |
| **POST** | `/register` | ❌ No | Register a new user |
| **POST** | `/login` | ❌ No | Login & get JWT token |
| **GET** | `/restaurants` | ❌ No | Get list of all restaurants |
| **GET** | `/restaurants/top` | ❌ No | Show top 5 restaurants based on rating |
| **GET** | `/restaurants/:id` | ❌ No | Get single restaurant by ID |
| **POST** | `/restaurants` | 🔒 **Yes** | Add a new restaurant |
| **PUT** | `/restaurants/:id` | 🔒 **Yes** | Update restaurant details |
| **DELETE**| `/restaurants/:id` | 🔒 **Yes** | Delete restaurant by ID |
| **GET** | `/restaurants/:id/menu` | ❌ No | Get all menu items for a specific restaurant |
| **POST** | `/restaurants/:id/menu` | 🔒 **Yes** | Add menu item to a restaurant |
| **PUT** | `/menu/:id` | 🔒 **Yes** | Update menu item details |
| **DELETE**| `/menu/:id` | 🔒 **Yes** | Delete menu item by ID |
