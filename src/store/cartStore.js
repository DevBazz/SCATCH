import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(persist((set, get) => ({
    cartItems: [],
    totalAmount: 0,
    totalItems: 0,
    addToCart: (product, quantity = 1) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(item => item.id === product._id);
        let updatedCart;
        if (existingItem) {
            updatedCart = cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
        } else {
            updatedCart = [...cartItems, { ...product, id: product._id, quantity }];
        }
        set({ cartItems: updatedCart });
        get().calculateTotals();
    },
    removeFromCart: (productId) => {
        const { cartItems } = get();
        const updatedCart = cartItems.filter(item => item.id !== productId);
        set({ cartItems: updatedCart });
        get().calculateTotals();
    },
    updateQuantity: (productId, quantity) => {
        const { cartItems } = get();
        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
        set({ cartItems: updatedCart });
        get().calculateTotals();
    },
    clearCart: () => {
        set({ cartItems: [], totalAmount: 0, totalItems: 0 });
    },
    calculateTotals: () => {
        const { cartItems } = get();
        const totalAmount = cartItems.reduce((sum, item) => {
        const discount = item.Discount || 0; // default to 0 if no discount
       const discountedPrice = item.Price - (item.Price * discount) / 100;
      return sum + discountedPrice * item.quantity;
}, 0);
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        set({ totalAmount, totalItems });
    }
}), {
    name: "cart-storage", // unique name
}));

export default useCartStore;