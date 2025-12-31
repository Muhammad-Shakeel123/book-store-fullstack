import { useState, useEffect } from "react";
import Loader from "../loader/Loader";
import { getUserInformation, updateAddress } from "../../api/userApi";
function Settings() {
   const [Value, setValue] = useState({ address: "" });
   const [ProfileData, setProfileData] = useState();
   const change = (e) => {
      const { name, value } = e.target;
      setValue({ ...Value, [name]: value });
   };

   const headers = {
      userid: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
   };
   useEffect(() => {
      const fetch = async () => {
         const result = await getUserInformation(headers);
         setProfileData(result.data);
         setValue({ address: result.data.address });
      };
      fetch();
   }, []);

   const update = async () => {
      console.log("Update function triggered!");
      const userData = { address: Value.address };
      const result = await updateAddress(userData, headers);

      if (result?.message) {
         alert(result.message);
         setValue({ address: "" });
      } else {
         alert("Something went wrong!");
      }
   };

   return (
      <>
         {!ProfileData && (
            <div className="flex items-center justify-center h-full">
               <Loader />
            </div>
         )}
         {ProfileData && (
            <div className="h-full p-0 md:p-4 text-zinc-100">
               <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Settings</h1>
               <div className="flex gap-12">
                  <div>
                     <label htmlFor="">Usrname</label>
                     <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                        {ProfileData.username}
                     </p>
                  </div>
                  <div>
                     <label htmlFor="">Email</label>
                     <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                        {ProfileData.email}
                     </p>
                  </div>
               </div>
               <div className="flex flex-col mt-4">
                  <label htmlFor="">Address</label>
                  <textarea
                     rows={4}
                     className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
                     value={Value.address}
                     placeholder="Address"
                     name="address"
                     onChange={change}
                  />
               </div>
               <div className="mt-4 flex justify-end">
                  <button
                     className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-600"
                     onClick={update}
                  >
                     Update
                  </button>
               </div>
            </div>
         )}
      </>
   );
}

export default Settings;
