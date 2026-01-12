import ViewBookDetails from "./components/viewBookDetails/ViewBookDetails";
import Favourites from "./components/profile/Favourites.jsx";
import UserOrderHistory from "./components/profile/UserOrderHistory.jsx";
import Settings from "./components/profile/Settings.jsx";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AllOrders from "./pages/AllOrders.jsx";
import AddBook from "./pages/AddBook.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth.js";
function App() {
   const dispatch = useDispatch();
   const role = useSelector((state) => state.auth.role);
   useEffect(() => {
      if (
         localStorage.getItem("id") &&
         localStorage.getItem("token") &&
         localStorage.getItem("role")
      ) {
         dispatch(authActions.login());
         dispatch(authActions.changeRole(localStorage.getItem("role")));
      }
   }, []);

   return (
      <div>
         <Navbar />
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/all-books" element={<AllBooks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/update-book/:id" element={<UpdateBook />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />}>
               {role === "user" ? (
                  <Route index element={<Favourites />} />
               ) : role === "admin" ? (
                  <Route index element={<AllOrders />} />
               ) : null}

               {role === "admin" && <Route path="add-book" element={<AddBook />} />}
               <Route path="orderhistory" element={<UserOrderHistory />} />
               <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
         </Routes>
         <Footer />
      </div>
   );
}

export default App;
