import { Link } from "react-router-dom";
import { removeBookFromFavourites } from "../../api/favouritesApi";

function BookCard({ data, favourite, onRemove }) {
   const headers = {
      userid: localStorage.getItem("id"),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: data._id,
   };

   const handlRemoveBook = async () => {
      const result = await removeBookFromFavourites(headers);
      alert(result.data);
      if (onRemove) onRemove(data._id);
   };

   return (
      <div className="bg-zinc-800 rounded p-4 flex flex-col">
         <Link to={`/view-book-details/${data._id}`}>
            <div className="bg-zinc-800 rounded p-4 flex flex-col">
               <div className="bg-zinc-900 rounded flex items-center justify-center ">
                  <img src={data.url} alt="/" className="h-[25vh]" />
               </div>
               <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
               <p className="mt-2 text-zinc-400 font-semibold">by {data.authors}</p>
               <p className="mt-2 text-zinc-200 font-semibold text-xl">$ {data.price}</p>
            </div>
         </Link>
         {favourite && (
            <button
               onClick={handlRemoveBook}
               className="bg-yellow-50 px-4 py-2 border border-yellow-500 rounded text-yellow-500 mt-4"
            >
               Remove From Favourites
            </button>
         )}
      </div>
   );
}

export default BookCard;
