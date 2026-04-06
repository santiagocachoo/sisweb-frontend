import api from ".";
import { AxiosError } from "axios";
import type { Product } from "my-types";

// Define la forma de la respuesta del backend
interface ApiResponse<T> {
  payload: T;
}

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await api.get<ApiResponse<Product[]>>("/product");
    console.log(res.data.payload)
    return res.data.payload;
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error fetching products:", err.message);

    // Puedes lanzar el error para manejarlo en UI
    throw err;
  }
};
