# AWDF — Advanced Web Development Framework
**Student:** Sirf Vadukiya  
**Program:** B.Tech Information Technology, CHARUSAT University  

This repository contains the complete coursework and integrated project for the Advanced Web Development Framework (AWDF), covering **Practicals 1 through 7**: from the initial React Portfolio to a complete, full-stack, authenticated MERN Task Management application.

---

## 📁 Project Architecture & Structure

The repository supports both modular separate execution (`backend/` and `frontend/`) and integrated root execution:

```
AWDF/
├── backend/                   # Practical 6 & 7 Express + MongoDB Backend
│   ├── middleware/            # Auth and validation middleware
│   │   ├── auth.js            # JWT verification middleware
│   │   └── validate.js        # Server-side validation for auth & tasks
│   ├── models/                # Mongoose models
│   │   ├── Task.js            # Task schema (title, description, completed)
│   │   └── User.js            # User schema (email, bcrypt-hashed password)
│   ├── routes/                # Express routes
│   │   ├── auth.js            # /auth/register, /auth/login, /auth/me
│   │   └── tasks.js           # Full CRUD: /tasks (GET, POST, PUT, DELETE)
│   ├── .env.example           # Environment template
│   ├── package.json           # Backend dependencies & scripts
│   └── server.js              # Express server entry point (Port 5000)
│
├── frontend/                  # Practical 6 & 7 Standalone React (Vite) App
│   ├── src/
│   │   ├── components/        # AuthForm, TaskForm, TaskList, Toast, ConfirmDialog
│   │   ├── api.js             # Centralized API layer with JWT & error handling
│   │   ├── App.jsx            # Main app with auth state routing
│   │   ├── AuthContext.jsx    # React Context for JWT auth & session handling
│   │   ├── TaskManager.jsx    # Complete Task Manager UI
│   │   ├── index.css          # App styles
│   │   └── main.jsx           # Vite React root
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── src/                       # Integrated Student Portfolio (Practicals 1–5)
│   ├── assets/                # Images and SVG icons
│   ├── components/            # NavBar, ErrorMessage, Spinner, and Task components
│   ├── pages/                 # Home, Projects, Tasks, Contact, NotFound
│   ├── App.jsx                # Portfolio router + Dark Mode toggle
│   └── main.jsx               # Integrated root mount
│
├── models/                    # Root Mongoose models for standalone server.js
├── .env.example               # Root environment template
├── .gitignore                 # Unified Git ignore rules
├── package.json               # Root dependencies & scripts
├── server.js                  # Root Express server (Port 5000)
└── PR7 README.md              # Detailed PR7 specification & testing guide
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** (local `mongod` or MongoDB Atlas connection string)

---

### Option 1: Running Modular Backend and Frontend (Recommended)

#### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and configure your MONGO_URI and JWT_SECRET
npm run dev      # or: npm start
```
*Backend runs on `http://localhost:5000`.*

#### 2. Frontend Setup (in a separate terminal)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

### Option 2: Running from Root Directory

```bash
# Install root dependencies
npm install

# Start backend server
npm run server

# In another terminal, start frontend
npm run dev
```

---

## 🛠 Features Implemented

### 1. Student Portfolio (Practicals 1–3)
- **Home:** Personal profile, bio, education, and technical skill inventory.
- **Projects:** Live GitHub repository fetching with loading spinners and error handling.
- **Contact:** Interactive contact form.
- **Navigation & Themes:** React Router navigation and persistent Dark Mode toggle.

### 2. Full-Stack Task Manager (Practicals 4–6)
- **CORS-enabled REST API:** Express 4/5 backend communicating seamlessly with Vite frontend.
- **Database Persistence:** Full CRUD operations backed by MongoDB via Mongoose.
- **Optimistic UI:** Instant UI updates when creating tasks, automatically rolled back if backend calls fail.
- **Confirmation Dialogs:** Double-check confirmations before deleting tasks.
- **Real-Time Toast Notifications:** Visual feedback on success or failure of all operations.

### 3. Authentication & Security Pipeline (Practical 7)
- **User Authentication:** Registration (`POST /auth/register`) and Login (`POST /auth/login`).
- **Password Hashing:** Passwords securely hashed with `bcryptjs` (salt rounds = 10) before saving.
- **JWT Protection:** Token-based authentication using `jsonwebtoken` protecting `/tasks` endpoints.
- **Client Session Management:** `AuthContext` with automatic token verification (`GET /auth/me`), localStorage persistence, and auto-logout on `401 Unauthorized`.
- **Server-Side Validation:** Defensive input sanitization for emails, passwords, and task data.

---

## 📡 API Endpoints

### Auth Endpoints
| Method | Route | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/auth/register` | Register new user | No |
| `POST` | `/auth/login` | Authenticate user & return JWT | No |
| `GET` | `/auth/me` | Fetch logged-in user profile | Yes (`Bearer <token>`) |

### Task Endpoints
| Method | Route | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/tasks` | List all tasks | Optional / Yes |
| `POST` | `/tasks` | Create a new task | Yes |
| `PUT` | `/tasks/:id` | Update task title / completion | Yes |
| `DELETE` | `/tasks/:id` | Delete task | Yes |

---

## 🧪 Testing

1. **Verify Backend:**
   ```bash
   curl http://localhost:5000/
   # Returns: {"status":"AWDF PR6/PR7 backend running"}
   ```

2. **Verify Auth:**
   - Register a new account via the frontend or `POST /auth/register`.
   - Log in to receive a JWT.
   - Tasks will load and sync with MongoDB.
