import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

export const addBook = async (data, headers) => {
   try {
      const response = await api.post("/books/add-book", data, { headers });
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};

export const getAllBooks = async () => {
   try {
      const response = await api.get("/books/get-all-books");
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};

export const recentlyAddedBooks = async () => {
   try {
      const response = await api.get("/books/get-recents-books");
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};

export const getBookById = async (id) => {
   try {
      const response = await api.get(`/books/get-book-by-id/${id}`);
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};

export const removeBook = async (headers) => {
   try {
      const response = await api.delete("/books/delete-book", { headers });
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};

export const updateBook = async (Data, passedHeaders) => {
   try {
      const response = await api.put("/books/update-book", Data, {
         headers: {
            ...passedHeaders,
         },
      });
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};
