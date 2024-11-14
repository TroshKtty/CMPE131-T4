import { CartContext } from "@/providers/CartProvider";
import { useContext } from "react";

export const useCart = () => useContext(CartContext);
