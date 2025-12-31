import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, updateBook } from "../api/bookApi";

function UpdateBook() {
   const [Data, setData] = useState({
      url: "",
      title: "",
      authors: "",
      price: "",
      desc: "",
      language: "",
   });

   const { id } = useParams();
   const navigate = useNavigate();
   const headers = {
      id: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: id,
   };
   const chagne = (e) => {
      const { name, value } = e.target;
      setData({ ...Data, [name]: value });
   };

   const submit = async (e) => {
      e.preventDefault();

      const { url, title, authors, price, desc, language } = Data;

      if (!url || !title || !authors || !price || !desc || !language) {
         alert("All fields are required");
         return;
      }

      const result = await updateBook(Data, headers);

      if (result.error) {
         alert(result.error);
      } else {
         alert(result.message || "Book updated successfully");

         setData({
            url: "",
            title: "",
            authors: "",
            price: "",
            desc: "",
            language: "",
         });

         navigate(`/view-book-details/${id}`);
      }
   };

   useEffect(() => {
      const fetch = async () => {
         const result = await getBookById(id);
         setData(result.data);
      };
      fetch();
   }, []);

   return (
      <div className="bg-zinc-900 h-full p-0 md:p-4">
         <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Update Book</h1>
         <div className="p-4 rounded bg-zinc-800">
            <div className="">
               <label htmlFor="" className="text-zinc-400">
                  Image url
               </label>
               <input
                  type="text"
                  className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                  placeholder="url of image"
                  name="url"
                  required
                  value={Data.url}
                  onChange={chagne}
               />
            </div>

            <div className="mt-4">
               <label htmlFor="" className="text-zinc-400">
                  Title
               </label>
               <input
                  type="text"
                  className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                  placeholder="Title"
                  name="title"
                  required
                  value={Data.title}
                  onChange={chagne}
               />
            </div>

            <div className="mt-4">
               <label htmlFor="" className="text-zinc-400">
                  Authors
               </label>
               <input
                  type="text"
                  className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                  placeholder="Authors"
                  name="authors"
                  required
                  value={Data.authors}
                  onChange={chagne}
               />
            </div>

            <div className="mt-4 flex gap-4">
               <div className="w-3/6">
                  <label htmlFor="" className="text-zinc-400">
                     Language
                  </label>
                  <input
                     type="text"
                     className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                     placeholder="language"
                     name="language"
                     required
                     value={Data.language}
                     onChange={chagne}
                  />
               </div>

               <div className="w-3/6">
                  <label htmlFor="" className="text-zinc-400">
                     Price
                  </label>
                  <input
                     type="text"
                     className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                     placeholder="Price"
                     name="price"
                     required
                     value={Data.price}
                     onChange={chagne}
                  />
               </div>
            </div>

            <div className="">
               <label htmlFor="" className="text-zinc-400">
                  Descripton of Book
               </label>
               <textarea
                  type="text"
                  rows={5}
                  className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                  placeholder="Description"
                  name="desc"
                  required
                  value={Data.desc}
                  onChange={chagne}
               />
            </div>
            <button
               className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
               onClick={submit}
            >
               Update Book
            </button>
         </div>
      </div>
   );
}

export default UpdateBook;
