# PikyHost

**PikyHost** is a modern full-stack web application built using React (frontend) and Node.js with Express (backend). It uses TypeScript for strong typing and MySQL for relational database management. This project is structured for scalability, performance, and ease of deployment.

---

## 🧱 Tech Stack

### Frontend:
- ⚛️ [React](https://reactjs.org/)
- 🎨 [SASS](https://sass-lang.com/) (SCSS syntax)
- 🌐 Axios (for HTTP requests)
- 🌍 i18n (for multi-language support)
- 🛠️ Vite or Webpack (choose your bundler)

### Backend:
- 🧠 [Node.js](https://nodejs.org/)
- 🚀 [Express](https://expressjs.com/)
- 🦾 [TypeScript](https://www.typescriptlang.org/)
- 🔐 JWT-based Authentication
- 🔄 RESTful API Design

### Database:
- 🗃️ [MySQL](https://www.mysql.com/)
- 🧩 Sequelize / Knex / Raw Queries (depending on your setup)

---

## 📁 Project Structure

```
PikyHost/
├── Front/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/       # SCSS styles
│   │   └── App.tsx
│   └── package.json
├── API/               # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.ts
│   ├── .env
│   └── package.json
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/absallam1999/PikyHost.git
cd PikyHost
```

---

### 2. Setup Environment Variables

Create a `.env` file inside the `/API` directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=pikyhost
JWT_SECRET=your_jwt_secret
```

---

### 3. Install Dependencies

#### Backend

```bash
cd API
npm install
```

#### Frontend

```bash
cd Front
npm install
```

---

### 4. Run the App

#### Development Mode

Start the backend:

```bash
cd API
npm run dev
```

Start the frontend:

```bash
cd Front
npm run dev
```

Frontend runs on `http://localhost:3000`  
Backend runs on `http://localhost:5000`

---

## 🛠 Features

- ✅ User Authentication (JWT)
- ✅ Role-based Access
- ✅ Dynamic content management via Admin Panel
- ✅ Responsive UI (SASS & Flex/Grid)
- ✅ Internationalization (EN / AR)
- ✅ RESTful API (secure + documented)
- ✅ MySQL relational data with associations

---

## 🔐 Auth System

- Secure registration and login (JWT)
- Role-based access for Admin and Normal Users
- Middleware for route protection
- Passwords hashed using bcrypt
- Reset-password, forget-password and delete-account support

---

## 💼 Admin Panel

- Admin login using special password or JWT-based session
- Manage Sections and Section Items (CRUD)
- Edit homepage texts and translations
- Control visibility and sort order of content
- Manage Admin Passwords securely

---

## 🌐 Multi-language Home Page

- Translations using i18next
- Content managed in backend as structured JSON (`body_en`, `body_ar`)
- Admin panel allows editing localized content
- Supports dynamic loading based on user-selected language

---

## 📦 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint             | Description                    |
|--------|----------------------|--------------------------------|
| POST   | `/auth/login`        | Authenticate user              |
| POST   | `/auth/register`     | Register new user              |
| POST   | `/auth/forgot`       | Request password reset         |
| POST   | `/auth/reset`        | Reset user password            |
| DELETE | `/auth/delete`       | Delete account                 |
| GET    | `/users/me`          | Get logged-in user             |
| GET    | `/sections/:key`     | Get section with items         |
| PUT    | `/admin/sections/:id`| Update section (admin only)    |

> More API docs available in `/docs` (Postman/Swagger optional)

---

## 🧪 Scripts

| Command              | Description                    |
|---------------------|--------------------------------|
| `npm run dev`        | Run in development mode        |
| `npm run build`      | Build project for production   |
| `npm run start`      | Start production server        |
| `npm run lint`       | Run ESLint                     |
| `npm run format`     | Format using Prettier          |

---

## 📚 Deployment

To deploy to a hosting service like Vercel, Netlify, or shared hosting:

### Frontend (Vite Build)

```bash
cd Front
npm run build
```

### Backend (PM2, cPanel, or custom VPS)

```bash
cd API
npm run build
npm run start
```

Ensure `.env` is configured correctly for production.

---

## 📌 To-Do

- [ ] Add test coverage (Jest or Mocha)

---

## 📄 License

MIT License © 2025 [Mohamed Badr](https://github.com/absallam1999)

---

## 👩‍💻 Collaborators

- Eman Gazy [github](https://github.com/EmanGhazy-2002)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check [issues page](https://github.com/absallam1999/PikyHost/issues).

---

## 📞 Contact

For support, email: **support@pikyhost.com**
