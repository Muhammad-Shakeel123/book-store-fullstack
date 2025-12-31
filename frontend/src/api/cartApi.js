import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

export const addBookToCart = async (passedHeaders) => {
   try {
      const response = await api.put(
         "/carts/add-book-to-cart",
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

export const getUserCartBooks = async (headers) => {
   try {
      const response = await api.get("/carts/get-carts-books", { headers });
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};

export const removeBookFromCart = async (bookid, passedHeaders) => {
   try {
      const response = await api.put(
         `/carts/remove-book-from-cart/${bookid}`,
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
