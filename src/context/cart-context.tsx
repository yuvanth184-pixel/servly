"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ServiceType } from "@/data/serviceDetails";

export interface CartItem {
  serviceType: ServiceType;
  serviceName: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (serviceType: ServiceType, serviceName: string) => void;
  removeItem: (serviceTypeId: string) => void;
  totalItems: number;
  totalPrice: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (serviceType: ServiceType, serviceName: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.serviceType.id === serviceType.id);
      if (existing) {
        return prev.map((i) =>
          i.serviceType.id === serviceType.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { serviceType, serviceName, quantity: 1 }];
    });
  };

  const removeItem = (serviceTypeId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.serviceType.id === serviceTypeId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.serviceType.id === serviceTypeId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );
      }
      return prev.filter((i) => i.serviceType.id !== serviceTypeId);
    });
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.serviceType.price * i.quantity, 0);

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, totalItems, totalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
