import React, { useEffect, useState } from "react";
import SideBar from "../components/profile/SideBar";
import { Outlet } from "react-router-dom";
import { getUserInformation } from "../api/userApi";
import Loader from "../components/loader/Loader";
import MobileNav from "../components/profile/MobileNav";
function Profile() {
   const [Profile, setProfile] = useState();
   const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
   };
   useEffect(() => {
      const fetch = async () => {
         const result = await getUserInformation(headers);
         setProfile(result.data);
      };
      fetch();
   }, []);
   return (
      <div className="bg-zinc-900  px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
         {!Profile && (
            <div className="w-full h-full flex justify-center items-center">
               <Loader />
            </div>
         )}
         {Profile && (
            <>
               <div className="w-full md:w-1/6 h-auto lg:h-screen">
                  <SideBar data={Profile} />
                  <MobileNav />
               </div>
               <div className="w-full md:w-5/6">
                  <Outlet />
               </div>
            </>
         )}
      </div>
   );
}

export default Profile;
