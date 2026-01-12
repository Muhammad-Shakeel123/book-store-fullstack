# 📚 BookStore Full-Stack Application

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://vercel.com/)

A comprehensive full-stack e-commerce bookstore application built with modern web technologies. This project features a robust backend API powered by Node.js and Express, and a responsive frontend built with React and Vite. The application allows users to browse books, manage shopping carts, place orders, and maintain favorite lists, with secure authentication and role-based access control.

## 🌐 Live Deployments

- **Frontend**: [book-store-fullstack-awja.vercel.app](https://book-store-fullstack-ak5f.vercel.app)
- **Backend API**: [book-store-fullstack-eosin.vercel.app](https://book-store-fullstack-eosin.vercel.app)
- **Repository**: [GitHub Repository](https://github.com/Muhammad-Shakeel123/book-store-fullstack.git)

## ✨ Features

### 🔐 Authentication & Authorization

- User registration and login with JWT-based authentication
- Secure password hashing with bcrypt
- Role-based access control (Admin/User)
- Protected routes and middleware

### 📖 Book Management

- Comprehensive book catalog with detailed information
- Add, update, and delete books (Admin only)
- Search and filter books by various criteria
- Book details view with rich descriptions

### 🛒 Shopping Cart & Orders

- Add/remove books from cart
- Persistent cart across sessions
- Order placement and history tracking
- Order status management

### ❤️ Favorites System

- Add books to favorites list
- Personalized recommendations based on favorites
- Easy access to favorite books

### 👤 User Profile

- User dashboard with order history
- Profile settings and account management
- Mobile-responsive navigation

### 🎨 Modern UI/UX

- Responsive design with Tailwind CSS
- Intuitive navigation and user interface
- Loading states and error handling
- Mobile-first approach

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt for password hashing, CORS
- **Development**: Nodemon, Prettier, ESLint

### Frontend

- **Framework**: React 19 with Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Development**: ESLint, Vite plugins

## 📁 Project Structure

```
BooksStore/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── index.js               # Server entry point
│   │   ├── constant.js            # Application constants
│   │   ├── controllers/           # Business logic controllers
│   │   │   ├── book.controller.js
│   │   │   ├── cart.controller.js
│   │   │   ├── favorites.controller.js
│   │   │   ├── order.controller.js
│   │   │   └── user.controller.js
│   │   ├── db/                    # Database connection
│   │   │   └── index.js
│   │   ├── middlewares/           # Custom middlewares
│   │   │   └── auth.middleware.js
│   │   ├── models/                # Mongoose models
│   │   │   ├── book.model.js
│   │   │   ├── order.model.js
│   │   │   └── user.model.js
│   │   ├── routes/                # API route definitions
│   │   │   ├── book.routes.js
│   │   │   ├── cart.routes.js
│   │   │   ├── favourites.routes.js
│   │   │   ├── order.routes.js
│   │   │   └── user.routes.js
│   │   └── utils/                 # Utility functions
│   │       ├── ApiError.js
│   │       ├── ApiResponse.js
│   │       └── asyncHandler.js
│   ├── package.json
│   ├── vercel.json                # Vercel deployment config
│   └── .env                       # Environment variables
└── frontend/
    ├── src/
    │   ├── App.jsx                # Main app component
    │   ├── main.jsx               # React entry point
    │   ├── api/                   # API service modules
    │   │   ├── bookApi.js
    │   │   ├── cartApi.js
    │   │   ├── favouritesApi.js
    │   │   ├── orderApi.js
    │   │   └── userApi.js
    │   ├── components/            # Reusable UI components
    │   │   ├── bookCard/BookCard.jsx
    │   │   ├── footer/Footer.jsx
    │   │   ├── home/Hero.jsx
    │   │   ├── home/RecentlyAdded.jsx
    │   │   ├── loader/Loader.jsx
    │   │   ├── navbar/Navbar.jsx
    │   │   ├── profile/Favourites.jsx
    │   │   ├── profile/MobileNav.jsx
    │   │   ├── profile/Settings.jsx
    │   │   ├── profile/SideBar.jsx
    │   │   ├── profile/UserOrderHistory.jsx
    │   │   └── viewBookDetails/ViewBookDetails.jsx
    │   ├── pages/                 # Page components
    │   │   ├── AddBook.jsx
    │   │   ├── AllBooks.jsx
    │   │   ├── AllOrders.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Profile.jsx
    │   │   ├── SeeUserData.jsx
    │   │   ├── SignUp.jsx
    │   │   └── UpdateBook.jsx
    │   ├── store/                 # Redux store configuration
    │   │   ├── auth.js
    │   │   └── index.js
    │   ├── assets/                # Static assets
    │   ├── App.css
    │   └── index.css
    ├── public/
    │   ├── hero.png               # Hero image
    │   └── vercel.json            # Vercel deployment config
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Muhammad-Shakeel123/book-store-fullstack.git
   cd book-store-fullstack
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory with the following variables:

   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will be running on `http://localhost:8000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be running on `http://localhost:5173`

### Building for Production

1. **Build the Frontend**

   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel** (or your preferred hosting platform)

## 📡 API Documentation

The backend provides a RESTful API with the following endpoints:

### Authentication

- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout

### Books

- `GET /api/v1/books` - Get all books
- `GET /api/v1/books/:id` - Get book by ID
- `POST /api/v1/books` - Add new book (Admin)
- `PUT /api/v1/books/:id` - Update book (Admin)
- `DELETE /api/v1/books/:id` - Delete book (Admin)

### Cart

- `GET /api/v1/cart` - Get user's cart
- `POST /api/v1/cart` - Add item to cart
- `PUT /api/v1/cart/:id` - Update cart item
- `DELETE /api/v1/cart/:id` - Remove item from cart

### Orders

- `GET /api/v1/orders` - Get user's orders
- `POST /api/v1/orders` - Place new order
- `GET /api/v1/orders/:id` - Get order details

### Favorites

- `GET /api/v1/favorites` - Get user's favorites
- `POST /api/v1/favorites` - Add to favorites
- `DELETE /api/v1/favorites/:id` - Remove from favorites

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm run lint

# Backend testing (if implemented)
cd backend
npm test
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Muhammad Shakeel**

- GitHub: [@Muhammad-Shakeel123](https://github.com/Muhammad-Shakeel123)

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries
- Special thanks to Vercel for hosting support
- Inspired by modern e-commerce platforms

---

⭐ If you found this project helpful, please give it a star on GitHub!
