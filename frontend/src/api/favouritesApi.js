import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

export const removeBookFromFavourites = async (passedHeaders) => {
   try {
      const response = await api.put(
         "/favourites/remove-book-from-favourites",
         {},
         { headers: { ...passedHeaders } },
      );
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};

export const getFavouritesBooks = async (headers) => {
   try {
      const response = await api.get("/favourites/get-favourites-books", { headers });
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};

export const addBookToFavourites = async (passedHeaders) => {
   try {
      const response = await api.put(
         "/favourites/add-book-to-favourite",
         {},
         { headers: { ...passedHeaders } },
      );
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};
