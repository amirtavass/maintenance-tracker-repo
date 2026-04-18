# Maintenance Tracker

A comprehensive full-stack web application for managing student accommodation maintenance requests and issues.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [User Roles & Permissions](#user-roles--permissions)
- [Development](#development)
- [Contributing](#contributing)

## 🎯 Overview

The Maintenance Tracker is a student accommodation management platform designed to streamline the process of reporting, tracking, and resolving maintenance issues. Users can submit maintenance requests (tickets), and staff/admin can assign priorities and manage their resolution status.

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with password hashing using bcrypt
- **Role-Based Access Control**: Three user roles with different permission levels:
  - **Student**: Can report maintenance issues
  - **Staff**: Can view and manage maintenance tickets
  - **Admin**: Full system access and user management
- **Maintenance Ticket Management**: Create, track, and manage maintenance requests
  - Multiple status levels: Open, In-Progress, Resolved
  - Priority levels: Low, Medium, High, Urgent
  - Automatic timestamps for creation and updates
- **Protected Routes**: Role-specific endpoints and dashboard areas
- **RESTful API**: Well-structured API endpoints for all operations
- **Responsive UI**: Modern, mobile-friendly interface built with Next.js and Tailwind CSS

## 🛠 Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing library
- **CORS** - Cross-Origin Resource Sharing middleware

### Frontend

- **Next.js 16** - React framework with server-side rendering
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting

## 📁 Project Structure

```
maintenance-tracker-repo/
├── client/                          # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            # Home page
│   │   │   ├── layout.tsx          # Root layout
│   │   │   ├── globals.css         # Global styles
│   │   │   └── dashboard/          # Dashboard pages
│   │   │       ├── page.tsx
│   │   │       └── layout.tsx
│   │   └── public/                 # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── tailwind.config.js
│   └── eslint.config.mjs
│
├── server/                          # Express.js backend application
│   ├── controllers/
│   │   └── authController.js       # Authentication logic
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification middleware
│   │   └── verifyRole.js           # Role-based authorization
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   └── Ticket.js               # Maintenance ticket schema
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   └── protectedRoutes.js      # Protected endpoints
│   ├── utils/
│   │   └── generateToken.js        # JWT token generation
│   ├── package.json
│   ├── server.js                   # Main server file
│   ├── seed.js                     # Database seeding script
│   └── test-db.js                  # Database testing script
│
└── README.md                        # This file
```

## ✅ Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas cloud instance)
- **Git** (for version control)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd maintenance-tracker-repo
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## ⚙️ Configuration

1. Create a `.env` file in the `server/` directory:

```env
MONGO_URI=mongodb://localhost:27017/maintenance-tracker
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

**Environment Variables:**

- `MONGO_URI`: MongoDB connection string (local or MongoDB Atlas)
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for signing JWT tokens

> Note: On some macOS systems, port `5000` may already be occupied by a local service. If that happens, change `PORT` to `5001` in `server/.env`, and update frontend `fetch()` calls to use `http://localhost:5001`.

### Frontend Setup

The frontend automatically connects to the backend via environment configuration. Ensure the backend is running on `http://localhost:5000` or `http://localhost:5001` if port `5000` is unavailable.

## 🚀 Running the Application

### Development Mode

#### Terminal 1 - Start Backend Server

```bash
cd server
npm run dev
```

The backend will start on `http://localhost:5000` unless port `5000` is unavailable.

#### Terminal 2 - Start Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:3000`

> If you change the backend port to `5001` in `server/.env`, make sure the frontend auth URLs also use `http://localhost:5001`.

### Production Build

#### Backend

```bash
cd server
npm start
```

#### Frontend

```bash
cd client
npm run build
npm start
```

### Database Seeding

To populate the database with initial data:

```bash
cd server
npm run seed
```

### Testing Database Connection

```bash
cd server
node test-db.js
```

## 📡 API Endpoints

### Health Check

- `GET /api/health` - Check API status

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password, role? }`
  - Response: User object with ID, name, email, and role
- `POST /api/auth/login` - Authenticate user
  - Body: `{ email, password }`
  - Response: JWT token and user object

### Protected Endpoints (Require Authentication)

- `GET /api/protected/student` - Student area (accessible by student, staff, admin)
- `GET /api/protected/staff` - Staff area (accessible by staff, admin)
- `GET /api/protected/admin` - Admin area (accessible by admin only)

## 💾 Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required, trimmed),
  email: String (required, unique, lowercase, trimmed),
  password: String (required, hashed with bcrypt),
  role: String (enum: ["student", "staff", "admin"], default: "student"),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Ticket Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  status: String (enum: ["open", "in-progress", "resolved"], default: "open"),
  priority: String (enum: ["low", "medium", "high", "urgent"], default: "low"),
  createdBy: ObjectId (reference to User, required),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 👥 User Roles & Permissions

| Role        | Permissions                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| **Student** | • Create maintenance tickets<br>• View own tickets<br>• Access student-only areas                                   |
| **Staff**   | • All student permissions<br>• View all tickets<br>• Update ticket status and priority<br>• Access staff-only areas |
| **Admin**   | • All permissions<br>• User management<br>• System configuration<br>• Access admin-only areas                       |

## 🔐 Authentication & Security

- **Password Hashing**: All passwords are securely hashed using bcrypt with salt rounds of 10
- **JWT Authentication**: Tokens are generated and required for protected routes
- **Role-Based Authorization**: Middleware verifies user roles before allowing access
- **CORS**: Configured to prevent unauthorized cross-origin requests
- **Input Validation**: Email normalization and password validation on registration/login

## 📝 Development

### Code Quality

The project uses ESLint for code quality. Run linting:

```bash
cd client
npm run lint
```

### Project Scripts

**Backend Scripts:**

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with initial data

**Frontend Scripts:**

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a pull request

## 📄 License

ISC License

## 📧 Support

For issues or questions, please open an issue in the repository or contact the development team.

---

**Project Status**: Active Development

**Last Updated**: April 2026
