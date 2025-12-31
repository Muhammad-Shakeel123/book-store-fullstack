import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi.js";
import { authActions } from "../store/auth.js";
import { useDispatch } from "react-redux";

function Login() {
   const [Values, setValues] = useState({
      username: "",
      password: "",
   });
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const change = (e) => {
      const { name, value } = e.target;
      setValues({
         ...Values,
         [name]: value,
      });
   };

   const submit = async (e) => {
      e.preventDefault();

      const { username, password } = Values;

      if (!username || !password) {
         alert("All fields are required");
         return;
      }

      const result = await loginUser(Values);

      if (result.error) {
         if (result.status === 401) {
            alert("Invalid Creditionals");
         } else {
            alert(result.error || "Something went wrong");
         }
      } else {
         alert(result.message);
      }

      dispatch(authActions.login());
      dispatch(authActions.changeRole(result.data.user.role)); 

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("role", result.data.user.role);
      localStorage.setItem("id", result.data.user._id);

      navigate("/profile");
   };

   return (
      <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
         <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
            <p className="text-zinc-200 text-xl">Sign In</p>
            <div className="mt-4">
               <div>
                  <label htmlFor="" className="text-zinc-400">
                     Username
                  </label>
                  <input
                     type="text"
                     className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                     placeholder="username"
                     name="username"
                     required
                     value={Values.username}
                     onChange={change}
                  />
               </div>

               <div>
                  <label htmlFor="" className="text-zinc-400">
                     Password
                  </label>
                  <input
                     type="text"
                     className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                     placeholder="password"
                     name="password"
                     required
                     value={Values.password}
                     onChange={change}
                  />
               </div>

               <div className="mt-4">
                  <button
                     className="w-full bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-all duration-300 py-2"
                     onClick={submit}
                  >
                     Login
                  </button>
               </div>
               <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
                  Or
               </p>
               <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
                  Already have an account? &nbsp;
                  <Link to="/signup" className="hover:text-blue-500">
                     <u>Sign Up</u>
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}

export default Login;
