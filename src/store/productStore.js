import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
    products: [],
    product: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null});
        try {
            const res = await axios.get("http://localhost:3000/api/products", {
                withCredentials: true,
            })
            set({products: res.data, loading: false})
        } catch (error) {
            set({error: error.message, loading: false})
        }
    },

    fetchProduct: async (id) => {
        set({ loading: true, error: null});
        try {
            const res = await axios.get(`http://localhost:3000/api/products/${id}`, {
                withCredentials: true,
            })
            set({product: res.data, loading: false})
        } catch (error) {
            set({error: error.message, loading: false})
        }
    }
}))

export default useProductStore;
