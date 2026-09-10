# 🚀 TaskFlow — Full-Stack Project Management Platform

TaskFlow is a **full-stack project management platform** built with the **MERN stack**. It provides a modern, responsive interface for organizing projects, tasks, subtasks, and team members, backed by a modular Node.js/Express.js API and MongoDB database.

The project focuses on **secure authentication, scalable application architecture, reusable React components, REST APIs, and clean separation between frontend and backend responsibilities**.

---

## ✨ Features

### 🔐 Authentication & Security

- User registration and login
- JWT-based authentication
- Access Token and Refresh Token support
- HTTP-only cookie-based authentication
- Password hashing using **bcrypt**
- Email verification workflow
- Protected routes
- Current authenticated user retrieval
- Logout functionality
- Request validation
- Centralized API error handling

### 📋 Project & Task Management UI

- Project dashboard
- Project cards and recent projects
- Task management interface
- Task columns and task cards
- Task creation and editing modals
- Task details view
- Subtask creation and management
- Task progress tracking
- Team member management interface
- Member assignment interface
- Activity timeline
- Responsive dashboard layout

### 🎨 Frontend

- Responsive React.js interface
- Reusable component architecture
- React Context API for application/authentication state
- React Router for client-side navigation
- Axios-based API communication
- Protected frontend routes
- Tailwind CSS styling
- Toast notifications for user feedback

### ⚙️ Backend

- RESTful API architecture
- Express.js application
- Modular routes and controllers
- Mongoose models and schemas
- Authentication middleware
- Request validation middleware
- Centralized API response structure
- Centralized error handling
- Environment-based configuration
- MongoDB integration

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React.js** | Frontend UI |
| **React Router** | Client-side routing |
| **Tailwind CSS** | Styling and responsive design |
| **Axios** | API communication |
| **React Context API** | Global state management |
| **React Hot Toast** | Notifications |
| **Vite** | Development and build tooling |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Backend framework |
| **MongoDB** | Database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication |
| **bcrypt** | Password hashing |
| **Express Validator** | Request validation |
| **Nodemailer** | Email delivery |
| **Mailgen** | Email template generation |
| **Cookie Parser** | Cookie handling |
| **CORS** | Cross-origin request management |

---

## 🏗️ Project Architecture

TaskFlow follows a **separated frontend/backend architecture**.

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │   Tailwind CSS      │
                    └──────────┬──────────┘
                               │
                               │ Axios / HTTP
                               ▼
                    ┌─────────────────────┐
                    │    Express.js API   │
                    │      REST APIs       │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
        Controllers        Middleware        Validators
             │                 │                 │
             └─────────────────┼─────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Mongoose      │
                    │   Models / Schemas  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MongoDB       │
                    └─────────────────────┘
```

---

## 📁 Project Structure

```text
TaskFlow/
│
├── src/
│   ├── controllers/
│   │   ├── auth-controller.js
│   │   └── healthcheck.controllers.js
│   │
│   ├── db/
│   │   └── index.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── validators.middleware.js
│   │
│   ├── models/
│   │   ├── users.models.js
│   │   ├── project.models.js
│   │   ├── projectmember.models.js
│   │   ├── task.models.js
│   │   ├── sutask.models.js
│   │   └── note.models.js
│   │
│   ├── routes/
│   │   ├── auth.routers.js
│   │   └── healthcheck.route.js
│   │
│   ├── utils/
│   │   ├── api-error.js
│   │   ├── api-response.js
│   │   ├── async-handler.js
│   │   ├── constants.js
│   │   └── mail.js
│   │
│   ├── validators/
│   │   └── index.js
│   │
│   ├── app.js
│   └── index.js
│
├── public/
│   └── images/
│
├── task-manager-frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🔑 Authentication Flow

TaskFlow uses JWT-based authentication with access and refresh tokens.

```text
User
 │
 ▼
Register / Login
 │
 ▼
Express Authentication API
 │
 ├── Validate Request
 │
 ├── Verify User
 │
 ├── bcrypt Password Verification
 │
 └── Generate JWT Tokens
 │
 ▼
HTTP-Only Cookies
 │
 ▼
Protected API Requests
 │
 ▼
Authentication Middleware
 │
 ├── Extract Access Token
 │
 ├── Verify JWT
 │
 └── Identify User
 │
 ▼
Protected Controller
```

This approach keeps authentication logic separated from application controllers and allows protected resources to be accessed only by authenticated users.

---

## 🔒 Security

TaskFlow implements several security-oriented practices:

- Password hashing with **bcrypt**
- JWT access and refresh tokens
- HTTP-only cookies for token storage
- Protected API routes
- Authentication middleware
- Request validation
- CORS configuration
- Environment variables for sensitive configuration
- Centralized error responses
- Separation of authentication and application logic

> **Important:** Never commit `.env` files, database credentials, JWT secrets, or email service credentials to the repository.

---

## 🔌 API Structure

The backend API is versioned under:

```text
/api/v1
```

### Authentication

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/current-user
GET    /api/v1/auth/verify-email/:VerificationToken
POST   /api/v1/auth/resend-verification-email
POST   /api/v1/auth/forgot-password-request
POST   /api/v1/auth/Forgot-password-reset/:ResetToken
POST   /api/v1/auth/change-current-password
```

### Health Check

```text
GET    /api/v1/healthcheck
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend root directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

MAILTRAP_SMTP_HOST=your_smtp_host
MAILTRAP_SMTP_PORT=your_smtp_port
MAILTRAP_SMTP_USER=your_smtp_username
MAILTRAP_SMTP_PASS=your_smtp_password
```

Use your own credentials and secrets. Do not publish them to GitHub.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AyanPrt43/TaskFlow.git
```

```bash
cd TaskFlow
```

---

### 2. Install Backend Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create:

```text
.env
```

in the backend root directory and add the required environment variables.

---

### 4. Start the Backend

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The backend will run on the configured port, typically:

```text
http://localhost:3000
```

---

### 5. Start the Frontend

Move into the frontend directory:

```bash
cd task-manager-frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173
```

---

## 🔄 Frontend API Configuration

The frontend communicates with the backend using Axios.

```javascript
const api = axios.create({
    baseURL: "/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});
```

`withCredentials: true` allows authentication cookies to be included in API requests.

---

## 🧩 Reusable Frontend Components

The frontend is organized around reusable React components such as:

- `Navbar`
- `Sidebar`
- `ProjectCard`
- `TaskCard`
- `TaskColumn`
- `TaskDetailsModal`
- `CreateTaskModal`
- `EditTaskModal`
- `CreateProjectModal`
- `CreateSubtaskModal`
- `AssignMemberModal`
- `AddMemberModal`
- `MemberCard`
- `ActivityTimeline`
- `TaskProgress`
- `ProtectedRoute`

This component-based architecture makes the UI easier to maintain, extend, and reuse.

---

## 🧠 Key Learning Outcomes

This project demonstrates practical experience with:

- Full-stack MERN development
- REST API design
- JWT authentication
- Access/refresh token architecture
- Cookie-based authentication
- Password hashing
- MongoDB and Mongoose
- Express middleware
- Request validation
- React Context API
- React Router
- Axios
- Tailwind CSS
- Reusable React components
- Frontend/backend separation
- Environment configuration
- Error handling
- Email verification workflows

---

## 📌 Future Improvements

Planned improvements include:

- Complete project and task CRUD API integration
- Role-based access control
- Advanced project permissions
- Real-time task updates
- Search and filtering
- Task priorities and deadlines
- File and image attachments
- Dashboard analytics
- Improved notification system
- Production deployment and CI/CD
- Automated testing

---

## 👨‍💻 Author

**Ayan Pratap**

B.Tech Computer Science & Engineering

### Connect

- GitHub: `AyanPrt43`
- LinkedIn: Add your LinkedIn profile
- Portfolio: Add your portfolio URL

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is currently available for educational and development purposes.