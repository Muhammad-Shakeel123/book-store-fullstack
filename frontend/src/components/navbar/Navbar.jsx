import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

function Navbar() {
   let links = [
      { title: "Home", link: "/" },
      { title: "All Books", link: "/all-books" },
   ];

   const isloggedIn = useSelector((state) => state.auth.isLoggedIn);
   const userRole = useSelector((state) => state.auth.role);

   if (isloggedIn && userRole === "user") {
      links.push({ title: "Cart", link: "/cart" });
      links.push({ title: "Profile", link: "/profile" });
   }

   if (isloggedIn && userRole === "admin") {
      links.push({ title: "Admin Profile", link: "/profile" });
   }
   const [MobileNav, setMobileNav] = useState("hidden");

   return (
      <>
         <nav className="relative z-50 flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
            <Link to="/" className="flex items-center">
               <img
                  className="h-10 mr-4"
                  src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                  alt="logo"
               />
               <h1 className="text-2xl  font-semibold ">BookHeaven</h1>
            </Link>

            <div className="nav-links-bookheaven flex items-center gap-4">
               <div className="hidden md:flex gap-4">
                  {links.map((items, i) => (
                     <div className="flex items-center" key={i}>
                        {items.title === "Profile" || items.title === "Admin Profile" ? (
                           <Link
                              to={items.link}
                              className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                           >
                              {items.title}
                           </Link>
                        ) : (
                           <Link
                              to={items.link}
                              className="hover:text-blue-500 transition-all duration-300"
                              key={i}
                           >
                              {items.title}
                           </Link>
                        )}
                     </div>
                  ))}
               </div>

               <div className="hidden md:flex gap-4">
                  {isloggedIn === false && (
                     <>
                        <Link
                           to="/login"
                           className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                        >
                           Login
                        </Link>

                        <Link
                           to="/signup"
                           className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                        >
                           SignUp
                        </Link>
                     </>
                  )}
               </div>

               <button
                  className="text-white text-2xl hover:text-zinc-400 md:hidden"
                  onClick={() => {
                     if (MobileNav === "hidden") {
                        setMobileNav("block");
                     } else {
                        setMobileNav("hidden");
                     }
                  }}
               >
                  <FaGripLines />
               </button>
            </div>
         </nav>

         {/* mobile nav */}
         <div
            className={`bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center ${MobileNav}`}
         >
            {links.map((items, i) => (
               <Link
                  to={items.link}
                  className="text-white text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300"
                  key={i}
                  onClick={() => {
                     if (MobileNav === "hidden") {
                        setMobileNav("block");
                     } else {
                        setMobileNav("hidden");
                     }
                  }}
               >
                  {items.title}
               </Link>
            ))}

            {isloggedIn === false && (
               <>
                  <Link
                     to="/login"
                     className="px-8 mb-8 text-3xl font-semibold py-2 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                     onClick={() => {
                        if (MobileNav === "hidden") {
                           setMobileNav("block");
                        } else {
                           setMobileNav("hidden");
                        }
                     }}
                  >
                     Login
                  </Link>

                  <Link
                     to="/signup"
                     className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                     onClick={() => {
                        if (MobileNav === "hidden") {
                           setMobileNav("block");
                        } else {
                           setMobileNav("hidden");
                        }
                     }}
                  >
                     SignUp
                  </Link>
               </>
            )}
         </div>
      </>
   );
}

export default Navbar;
