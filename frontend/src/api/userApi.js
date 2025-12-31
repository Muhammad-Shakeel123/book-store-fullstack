import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

export const signUpUser = async (userData) => {
   try {
      const response = await api.post("/users/sign-up", userData);
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};

export const loginUser = async (userData) => {
   try {
      const response = await api.post("/users/sign-in", userData);
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};

export const getUserInformation = async (headers) => {
   try {
      const response = await api.get("/users/get-user-information", { headers });
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};

export const updateAddress = async (data, passedHeaders) => {
   try {
      const response = await api.put("/users/update-address", data, {
         headers: { ...passedHeaders },
      });
      return response.data;
   } catch (error) {
      return {
         error: error.response?.data?.message || error.message,
         status: error.response?.status || 500,
      };
   }
};
