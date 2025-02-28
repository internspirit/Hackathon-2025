import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            
            if (!existingItem) {
                state.cartItems.push(action.payload);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item Added!",
                    text: "This product has been successfully added to your cart.",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: "Already in Cart",
                    text: "This item is already in your cart!",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK"
                });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            Swal.fire({
                position: "top-end",
                icon: "info",
                title: "Item Removed",
                text: "The item has been removed from your cart.",
                showConfirmButton: false,
                timer: 1200
            });
        },
        clearCart: (state) => {
            state.cartItems = [];
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Cart Cleared",
                text: "Your cart has been emptied successfully.",
                showConfirmButton: false,
                timer: 1200
            });
        }
    }
});

// Export actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
