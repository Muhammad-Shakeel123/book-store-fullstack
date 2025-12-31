import React, { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { createOrder } from "../api/orderApi";
import { FaBeerMugEmpty } from "react-icons/fa6";
import { getUserCartBooks, removeBookFromCart } from "../api/cartApi";
function Cart() {
   const navigate = useNavigate();
   const [Cart, setCart] = useState();
   const [Total, setTotal] = useState(0);
   const headers = {
      userid: localStorage.getItem("id"),
      bookid: Cart?._id,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
   };

   useEffect(() => {
      const fetch = async () => {
         const result = await getUserCartBooks(headers);
         setCart(result.data);
      };
      fetch();
   }, []);

   const deletItems = async (bookid) => {
      try {
         const result = await removeBookFromCart(bookid, headers);
         if (result && !result.error) {
            alert("Book removed successfully");
            setCart((prevCart) => prevCart.filter((item) => item._id !== bookid));
         } else {
            alert(result.error || "Something went wrong");
         }
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      let sum = 0;
      if (Cart) {
         Cart.forEach((item) => {
            sum += item.price;
         });
         setTotal(sum);
         sum = 0;
      }
   }, [Cart]);

   const placeOrder = async () => {
      const data = { order: Cart };
      const result = await createOrder(data, headers);

      if (result.error) {
         alert(result.error);
      } else {
         alert("Order placed successfully!");
      }
      navigate("/profile/orderhistory");
   };
   return (
      <div className="bg-zinc-900 h-screen p-8">
         {!Cart && (
            <div className="flex items-center justify-center w-full h-full">
               <Loader />
            </div>
         )}
         {Cart && Cart.length === 0 && (
            <div className="h-screen">
               <div className="h-full flex items-center flex-col justify-center">
                  <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">Empty Cart</h1>
                  <FaBeerMugEmpty className="h-24 w-24 mt-4 text-blue-300" />
               </div>
            </div>
         )}
         {Cart && Cart.length > 0 && (
            <>
               <h1 className="text-5xl font-semibold mt-8 text-zinc-500">Your Cart</h1>
               {Cart.map((items, i) => (
                  <div
                     className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                     key={i}
                  >
                     <img src={items.url} alt="/" className="h-[20vh] md:h-[10vh] object-cover" />
                     <div className="w-full md:w-auto">
                        <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                           {items.title}
                        </h1>
                        <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                           {items.desc.slice(0, 100)}...
                        </p>
                        <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                           {items.desc.slice(0, 65)}...
                        </p>
                        <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                           {items.desc.slice(0, 100)}...
                        </p>
                     </div>
                     <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                        <h2 className="text-3xl text-zinc-100 font-semibold flex">
                           $ {items.price}
                        </h2>
                        <button
                           className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                           onClick={() => deletItems(items._id)}
                        >
                           <AiFillDelete />
                        </button>
                     </div>
                  </div>
               ))}
            </>
         )}
         {Cart && Cart.length > 0 && (
            <div className="w-full flex items-center justify-end mt-4">
               <div className="p-4 bg-zinc-800 rounded ">
                  <h1 className="text-3xl text-zinc-200 font-semibold">Total Amount</h1>
                  <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                     <h2>{Cart.length} Books </h2>
                     <h2>$ {Total}</h2>
                  </div>
                  <div className="w-full mt-3">
                     <button
                        className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
                        onClick={placeOrder}
                     >
                        Place Your Order
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default Cart;
