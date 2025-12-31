import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

export const createOrder = async (data, passedHeaders) => {
   try {
      const response = await api.post("/orders/place-order", data, {
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

export const userOrderHistory = async (passedHeaders) => {
   try {
      const response = await api.get("/orders/get-order-history", {
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

export const getAllOrders = async (passedHeaders) => {
   try {
      const response = await api.get("/orders/get-all-orders", {
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

export const updateOrderStatus = async (orderid, statusData, passedHeaders) => {
   try {
      const response = await api.put(`/orders/update-order-status/${orderid}`, statusData, {
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
