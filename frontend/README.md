# 📚 Digital Library (MERN Stack)

A full-stack Digital Library web application built with the MERN stack. Users can register, log in securely, and manage their own personal book collection with features like favorites, borrowing, searching, filtering, and sorting.

---

## ✨ Features

- 🔐 Secure User Authentication (JWT)
- 👤 User Registration & Login
- 🚪 Logout
- 📚 Add, Edit and Delete Books
- ❤️ Mark Books as Favorites
- 📖 Borrow / Return Books
- 🔍 Search Books
- 🏷️ Filter by Genre
- ↕️ Sort Books
- 📊 Dashboard Statistics
- 📈 Reading Progress
- 🔒 Private Library for Each User

---

## 🛠️ Technologies Used

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📂 Project Structure

```text
Digital-Library/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone <your-github-repository-url>
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/digital-library
JWT_SECRET=your_secret_key
```

---

## 📸 Screenshots

Add screenshots of:

- Login Page
- Register Page
- Library Dashboard
- Book Management

---

## 👩‍💻 Author

**Zahra**

Built as a full-stack MERN project using React, Node.js, Express, and MongoDB.