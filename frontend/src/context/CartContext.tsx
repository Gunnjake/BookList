import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    clearCart: () => void;
}   

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "bookstore_cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
    // Restore saved cart
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = sessionStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Save cart changes
    useEffect(() => {
        sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    // Merge duplicate items
    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((c) => c.bookId === item.bookId);
            const updatedCart = prevCart.map((c) =>
                c.bookId === item.bookId
                    ? { ...c, quantity: c.quantity + item.quantity }
                    : c
            );
            return existingItem ? updatedCart : [...prevCart, item];
        });
    };

    // Remove one quantity
    const removeFromCart = (bookId: number) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.bookId === bookId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    const clearCart = () => {
        setCart([]);
    };

    return (
        // Share cart context
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );  
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        // Guard provider usage
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
