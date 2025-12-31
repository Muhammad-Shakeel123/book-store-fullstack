import React, { useEffect, useState } from "react";
import { getAllBooks } from "../api/bookApi";
import BookCard from "../components/bookCard/BookCard";
import Loader from "../components/loader/Loader";
function AllBooks() {
   const [Data, setData] = useState();
   useEffect(() => {
      const fetch = async () => {
         const result = await getAllBooks();
         setData(result.data);
      };
      fetch();
   }, []);

   return (
      <div className="bg-zinc-900 px-12 py-8 h-auto">
         <h4 className="text-3xl text-yellow-100">All Books</h4>
         {!Data && (
            <div className="flex items-center justify-center w-full h-full">
               <Loader />
            </div>
         )}
         <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {Data &&
               Data.map((items, i) => (
                  <div key={i}>
                     <BookCard data={items} />{" "}
                  </div>
               ))}
         </div>
      </div>
   );
}

export default AllBooks;
