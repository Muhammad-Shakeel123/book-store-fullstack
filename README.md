# BookStore Project

This is a full-stack BookStore application with a Node.js/Express backend and a React/Vite frontend.

## Project Structure

```
BooksStore/
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── .prettierignore
│   ├── .prettierrc
│   ├── package-lock.json
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── constant.js
│       ├── index.js
│       ├── controllers/
│       │   ├── book.controller.js
│       │   ├── cart.controller.js
│       │   ├── favorites.controller.js
│       │   ├── order.controller.js
│       │   └── user.controller.js
│       ├── db/
│       │   └── index.js
│       ├── middlewares/
│       │   └── auth.middleware.js
│       ├── models/
│       │   ├── book.model.js
│       │   ├── order.model.js
│       │   └── user.model.js
│       ├── routes/
│       │   ├── book.routes.js
│       │   ├── cart.routes.js
│       │   ├── favourites.routes.js
│       │   ├── order.routes.js
│       │   └── user.routes.js
│       └── utils/
│           ├── ApiError.js
│           ├── ApiResponse.js
│           └── asyncHandler.js
└── frontend/
    ├── .gitignore
    ├── .prettierrc
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── vite.config.js
    ├── public/
    │   └── hero.png
    └── src/
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── api/
        │   ├── bookApi.js
        │   ├── cartApi.js
        │   ├── favouritesApi.js
        │   ├── orderApi.js
        │   └── userApi.js
        ├── assets/
        ├── components/
        │   ├── bookCard/
        │   │   └── BookCard.jsx
        │   ├── footer/
        │   │   └── Footer.jsx
        │   ├── home/
        │   │   ├── Hero.jsx
        │   │   └── RecentlyAdded.jsx
        │   ├── loader/
        │   │   └── Loader.jsx
        │   ├── navbar/
        │   │   └── Navbar.jsx
        │   ├── profile/
        │   │   ├── Favourites.jsx
        │   │   ├── MobileNav.jsx
        │   │   ├── Settings.jsx
        │   │   ├── SideBar.jsx
        │   │   └── UserOrderHistory.jsx
        │   └── viewBookDetails/
        │       └── ViewBookDetails.jsx
        ├── pages/
        │   ├── AddBook.jsx
        │   ├── AllBooks.jsx
        │   ├── AllOrders.jsx
        │   ├── Cart.jsx
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Profile.jsx
        │   ├── SeeUserData.jsx
        │   ├── SignUp.jsx
        │   └── UpdateBook.jsx
        └── store/
            ├── auth.js
            └── index.js
```

## Backend

The backend is built with Node.js and Express.js. It includes:

- Controllers for handling business logic (books, cart, favorites, orders, users)
- Models for data structures
- Routes for API endpoints
- Middlewares for authentication
- Utilities for error handling and responses
- Database connection setup

## Frontend

The frontend is built with React and Vite. It includes:

- Pages for different views (Home, Login, Profile, etc.)
- Components for reusable UI elements
- API modules for backend communication
- Store for state management
- Assets and public files

## Getting Started

1. Clone the repository
2. Install dependencies for backend and frontend
3. Set up environment variables
4. Run the backend server
5. Run the frontend development server
