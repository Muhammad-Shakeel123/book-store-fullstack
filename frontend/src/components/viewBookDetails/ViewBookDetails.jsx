import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getBookById, removeBook } from "../../api/bookApi";
import { addBookToFavourites } from "../../api/favouritesApi";
import { addBookToCart } from "../../api/cartApi";

function ViewBookDetails() {
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
   const role = useSelector((state) => state.auth.role);
   const { id } = useParams();
   const [Data, setData] = useState();
   const navigate = useNavigate();

   useEffect(() => {
      const fetch = async () => {
         const result = await getBookById(id);
         setData(result.data);
      };
      fetch();
   }, []);

   const headers = {
      userid: localStorage.getItem("id"),
      bookid: id,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
   };

   const handleFavourtes = async () => {
      const result = await addBookToFavourites(headers);

      if (result?.error) {
         alert(result.error);
      } else {
         alert("Book added to favourites!");
      }
   };

   const handleCart = async () => {
      const result = await addBookToCart(headers);
      console.log("result", result);
      if (result.error) {
         alert(result.error);
      } else {
         alert("Book add to cart");
      }
   };

   const deleteBook = async () => {
      const result = await removeBook(headers);
      alert(result.data);
      navigate("/all-books");
   };
   return (
      <>
         {Data && (
            <div className="bg-zinc-900 px-4 md:px-12 py-8 flex flex-col lg:flex-row gap-8">
               <div className=" w-full lg:w-3/6  ">
                  <div className="flex lg:flex-row flex-col justify-around bg-zinc-800 rounded  py-12 ">
                     <img
                        src={Data?.url}
                        alt="/"
                        className="lg:h-[70vh] h-[50vh] md:h-[60vh] rounded"
                     />
                     {isLoggedIn === true && role === "user" && (
                        <div className="flex flex-col  md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                           <button
                              className="bg-white rounded lg:rounded-full text-3xl p-3 text-red-500 flex items-center justify-center"
                              onClick={handleFavourtes}
                           >
                              <FaHeart /> <span className="ms-4 block lg:hidden">Favourites</span>
                           </button>
                           <button
                              className="text-white rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-4 bg-blue-500 flex items-center justify-center"
                              onClick={handleCart}
                           >
                              <FaCartArrowDown />{" "}
                              <span className="ms-4 block lg:hidden">Add to cart</span>
                           </button>
                        </div>
                     )}
                     {isLoggedIn === true && role === "admin" && (
                        <div className="flex flex-col  md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                           <Link
                              to={`/update-book/${id}`}
                              className="bg-white rounded lg:rounded-full text-3xl p-3 flex items-center justify-center"
                           >
                              <FaEdit /> <span className="ms-4 block lg:hidden">Edite</span>
                           </Link>
                           <button
                              className="text-red-500 rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-4 bg-white flex items-center justify-center"
                              onClick={deleteBook}
                           >
                              <MdDelete /> <span className="ms-4 block lg:hidden">Delete Book</span>
                           </button>
                        </div>
                     )}
                  </div>
               </div>
               <div className="p-4 w-full lg:w-3/6">
                  <h1 className="text-4xl text-zinc-300 font-semibold">{Data?.title}</h1>
                  <p className="text-zinc-400 mt-1">by {Data?.authors}</p>
                  <p className="text-zinc-500 mt-4 text-xl">{Data?.desc}</p>
                  <p className="text-zinc-400 mt-4 flex items-center justify-start">
                     <GrLanguage className="mr-3" /> {Data?.language}
                  </p>
                  <h2 className="text-3xl text-zinc-100 font-semibold mt-4">
                     Price: {Data?.price}
                  </h2>
               </div>
            </div>
         )}
         {!Data && (
            <div className="h-screen bg-zinc-900 flex items-center justify-center">
               <Loader />
            </div>
         )}
      </>
   );
}
export default ViewBookDetails;
