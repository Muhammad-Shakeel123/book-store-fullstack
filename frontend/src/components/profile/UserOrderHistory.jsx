import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import { TbHistoryOff } from "react-icons/tb";
import { userOrderHistory } from "../../api/orderApi";
function UserOrderHistory() {
   const [OrderHistory, setOrderHistory] = useState();
   const headers = {
      userid: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
   };

   useEffect(() => {
      const fetch = async () => {
         const result = await userOrderHistory(headers);
         setOrderHistory(result.data);
      };
      fetch();
   }, []);

   return (
      <>
         {!OrderHistory && (
            <div className="flex items-center justify-center h-full">
               <Loader />
            </div>
         )}
         {OrderHistory && OrderHistory.length === 0 && (
            <div className="h-[80vh] p-4 text-zinc-100">
               <div className="h-full flex flex-col items-center justify-center">
                  <h1 className="text-5xl font-semibold text-zinc-500 mb-8">No Order History</h1>
                  <TbHistoryOff className="h-[20vh] mt-8" />
               </div>
            </div>
         )}
         {OrderHistory && OrderHistory.length > 0 && (
            <div className="p-0 md:p-4 h-full text-zinc-100">
               <h1 className="md:text-5xl text-3xl font-semibold text-zinc-500 mb-8">
                  Order History
               </h1>
               <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
                  <div className="w-[3%]">
                     <h1 className="text-center">Sr.</h1>
                  </div>
                  <div className="w-[22%]">
                     <h1 className="">Books</h1>
                  </div>
                  <div className="w-[45%]">
                     <h1 className="">Description</h1>
                  </div>
                  <div className="w-[9%]">
                     <h1 className="">Price</h1>
                  </div>
                  <div className="w-[16%]">
                     <h1 className="">Status</h1>
                  </div>
                  <div className="w-none hidden md:block md:w-[5%]">
                     <h1 className="">Mode</h1>
                  </div>
               </div>
               {OrderHistory.map((items, i) => (
                  <div className="bg-zinc-800 w-full rounded py-3 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
                     <div className="w-[3%]">
                        <h1 className="text-center">{i + 1}</h1>
                     </div>
                     <div className="w-[22%]">
                        <Link
                           to={`/view-book-details/${items.book._id}`}
                           className="hover:text-blue-300"
                        >
                           {items.book.title}
                        </Link>
                     </div>
                     <div className="w-[45%]">
                        <h1 className="">{items.book.desc.slice(0, 50)}...</h1>
                     </div>
                     <div className="w-[9%]">
                        <h1 className="">{items.book.price}</h1>
                     </div>
                     <div className="w-[16%]">
                        <h1 className="font-semibold text-green-500">
                           {items.status === "Order Placed" ? (
                              <span className="text-yellow-500">{items.status}</span>
                           ) : items.status === "Cancelled" ? (
                              <span className="text-red-500">{items.status}</span>
                           ) : (
                              <span className="text-green-500">{items.status}</span>
                           )}
                        </h1>
                     </div>

                     <div className="w-none hidden md:block md:w-[5%]">
                        <h1 className="text-sm text-zinc-400">COD</h1>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </>
   );
}

export default UserOrderHistory;
