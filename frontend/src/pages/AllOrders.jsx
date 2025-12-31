import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";
import { getAllOrders, updateOrderStatus } from "../api/orderApi";

function AllOrders() {
   const [AllOrders, setAllOrders] = useState();
   const [Options, setOptions] = useState(-1);
   const [Values, setValues] = useState({ status: "" });
   const [UserDiv, setUserDiv] = useState("hidden");
   const [UserDivData, setUserDivData] = useState();
   const headers = {
      userid: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
   };

   useEffect(() => {
      const fetchOrders = async () => {
         const result = await getAllOrders(headers);

         if (result.error) {
            console.log(result.error);
         } else {
            setAllOrders(result.data);
         }
      };
      fetchOrders();
   }, []);

   const change = (e) => {
      const { value } = e.target;
      setValues({ status: value });
   };

   const submitChanges = async (i) => {
      const orderid = AllOrders[i]._id;

      const result = await updateOrderStatus(orderid, Values, headers);

      if (result.error) {
         alert(result.error);
      } else {
         const updatedOrders = [...AllOrders];
         updatedOrders[i].status = Values.status;
         setAllOrders(updatedOrders);

         alert(result.message || "Status updated successfully");
      }
   };

   const setOptionsButton = (i) => {
      setOptions(i);
      setValues({ status: AllOrders[i].status });
   };

   return (
      <>
         {!AllOrders && (
            <div className="h-full flex items-center justify-center">
               {" "}
               <Loader />
            </div>
         )}
         {AllOrders && AllOrders.length > 0 && (
            <div className="p-0 md:p-4 h-full text-zinc-100">
               <h1 className="md:text-5xl text-3xl font-semibold text-zinc-500 mb-8">All Orders</h1>
               <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
                  <div className="w-[3%]">
                     <h1 className="text-center">Sr.</h1>
                  </div>
                  <div className="w-[40%] md:w-[22%]">
                     <h1 className="">Books</h1>
                  </div>
                  <div className="w-0 md:w-[45%] hidden md:block">
                     <h1 className="">Description</h1>
                  </div>
                  <div className="md:w-[9%] w-[17%]">
                     <h1 className="">Price</h1>
                  </div>
                  <div className="w-[30%] md:w-[16%]">
                     <h1 className="">Status</h1>
                  </div>
                  <div className="w-none hidden md:block md:w-[5%]">
                     <h1 className="">Mode</h1>
                  </div>
                  <div className="md:w-[5%] w-[10%]">
                     <h1>
                        <FaUser />
                     </h1>
                  </div>
               </div>

               {AllOrders &&
                  AllOrders.map((items, i) => (
                     <div
                        key={i}
                        className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
                     >
                        <div className="w-[3%]">
                           <h1 className="text-center">{i + 1}</h1>
                        </div>

                        <div className="w-[40%] md:w-[22%]">
                           <Link
                              to={`/view-book-details/${items?.book?._id}`}
                              className="hover:text-blue-300"
                           >
                              {items?.book?.title}
                           </Link>
                        </div>

                        <div className="w-0 md:w-[45%] hidden md:block">
                           <h1 className="">{items?.book?.desc?.slice(0, 50)}...</h1>
                        </div>

                        <div className="md:w-[9%] w-[17%]">
                           <h1 className="">{items?.book?.price}</h1>
                        </div>

                        <div className="w-[30%] h-full md:w-[16%]">
                           <h1 className="font-semibold">
                              <button
                                 className="hover:scale-100 transition-all duration-300"
                                 onClick={() => setOptionsButton(i)}
                              >
                                 {/* Show updated color based on current status */}
                                 <span
                                    className={
                                       (Options === i ? Values.status : items.status) ===
                                       "order placed"
                                          ? "text-yellow-500"
                                          : (Options === i ? Values.status : items.status) ===
                                            "cancelled"
                                          ? "text-red-500"
                                          : (Options === i ? Values.status : items.status) ===
                                            "out for delivery"
                                          ? "text-blue-500"
                                          : (Options === i ? Values.status : items.status) ===
                                            "delivered"
                                          ? "text-green-500"
                                          : "text-white"
                                    }
                                 >
                                    {Options === i ? Values.status : items.status}
                                 </span>
                              </button>

                              {Options === i && (
                                 <div className="flex">
                                    <select
                                       name="status"
                                       id=""
                                       className="bg-gray-800"
                                       onChange={change}
                                       value={Values.status}
                                    >
                                       {[
                                          "order placed",
                                          "out for delivery",
                                          "delivered",
                                          "cancelled",
                                       ].map((status, index) => (
                                          <option value={status} key={index}>
                                             {status}
                                          </option>
                                       ))}
                                    </select>
                                    <button
                                       className="mx-2 text-green-500 hover:text-pink-600"
                                       onClick={() => {
                                          setOptions(-1);
                                          submitChanges(i);
                                       }}
                                    >
                                       <FaCheck />
                                    </button>
                                 </div>
                              )}
                           </h1>
                        </div>

                        <div className="w-[10%] md:w-[5%]">
                           <button
                              className="text-xl hover:text-orange-300"
                              onClick={() => {
                                 setUserDiv("fixed");
                                 setUserDivData(items.user);
                              }}
                           >
                              <IoOpenOutline />
                           </button>
                        </div>
                     </div>
                  ))}
            </div>
         )}
         {UserDivData && (
            <SeeUserData UserDivData={UserDivData} UserDiv={UserDiv} setUserDiv={setUserDiv} />
         )}
      </>
   );
}

export default AllOrders;
