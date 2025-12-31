import React, { useEffect, useState } from "react";
import BookCard from "../bookCard/BookCard";
import { ImStarEmpty } from "react-icons/im";
import { getFavouritesBooks } from "../../api/favouritesApi";
import Loader from "../loader/Loader";

function Favourites() {
   const [FavouritesBooks, setFavouritesBooks] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetch = async () => {
         const token = localStorage.getItem("token");
         const id = localStorage.getItem("id");

         if (!token || !id) {
            setLoading(false);
            return;
         }

         const headers = {
            userid: id,
            Authorization: `Bearer ${token}`,
         };

         const result = await getFavouritesBooks(headers);

         if (result?.data) {
            setFavouritesBooks(result.data);
         }

         setLoading(false);
      };

      fetch();
   }, []);

   const handleRemoveFromUI = (id) => {
      setFavouritesBooks((prev) => prev.filter((book) => book._id !== id));
   };

   if (loading) {
      return (
         <div className="flex items-center justify-center h-full">
            <Loader />
         </div>
      );
   }

   if (!loading && FavouritesBooks.length === 0) {
      return (
         <div className="text-5xl text-zinc-500 font-semibold flex flex-col items-center justify-center h-full w-full gap-3">
            No Favourites Books
            <ImStarEmpty className="h-30 w-30" />
         </div>
      );
   }

   return (
      <div className="grid grid-cols-4 gap-4">
         {FavouritesBooks.map((items) => (
            <BookCard key={items._id} data={items} favourite={true} onRemove={handleRemoveFromUI} />
         ))}
      </div>
   );
}

export default Favourites;
