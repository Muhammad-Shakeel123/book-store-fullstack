import React from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
function SideBar({ data }) {
   const dispatch = useDispatch();
   const history = useNavigate();
   const role = useSelector((state) => state.auth.role);
   return (
      <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-full">
         <div className=" flex flex-col items-center justify-center">
            <img src={data.avatar} className="h-[12vh]" />
            <p className="mt-3 text-xl text-zinc-100 font-semibold">{data.username}</p>
            <p className="mt-1 text-zinc-300 text-normal">{data.email}</p>
            <div className="w-full mt-4 h-px bg-zinc-500 hidden lg:block"></div>
         </div>

         {role === "user" && (
            <div className="w-full flex-col items-center justify-center hidden lg:flex">
               <Link
                  to="/profile"
                  className=" text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
               >
                  {" "}
                  Favourites
               </Link>
               <Link
                  to="/profile/orderhistory"
                  className=" text-zinc-100 font-semibold mt-4 w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
               >
                  {" "}
                  Order History
               </Link>
               <Link
                  to="/profile/settings"
                  className=" text-zinc-100 font-semibold mt-4 w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
               >
                  {" "}
                  Settings
               </Link>
            </div>
         )}
         {role === "admin" && (
            <div className="w-full flex-col items-center justify-center hidden lg:flex">
               <Link
                  to="/profile"
                  className=" text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
               >
                  {" "}
                  All Orders
               </Link>
               <Link
                  to="/profile/add-book"
                  className=" text-zinc-100 font-semibold mt-4 w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
               >
                  {" "}
                  Add Book
               </Link>
            </div>
         )}
         <button
            className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
            onClick={() => {
               // 1. Pehle Home page par bhej dein
               history("/");

               // 2. Phir data clear karein
               localStorage.removeItem("token");
               localStorage.removeItem("id");
               localStorage.removeItem("role");

               // 3. Sab se aakhir mein Redux update karein
               dispatch(authActions.logout());
               dispatch(authActions.changeRole("user"));
            }}
         >
            Logout <MdLogout className="ml-4" />
         </button>
      </div>
   );
}

export default SideBar;
