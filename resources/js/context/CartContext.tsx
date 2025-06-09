import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  tipo: string;
  cantidad?: number;
}

interface CartItem extends Producto {
  cantidad: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (producto: Producto) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, cantidad: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getCartKey = (userId?: number) => `cart_${userId ?? 'anonimo'}`;

export const CartProvider = ({ children, usuario }: { children: React.ReactNode, usuario: any }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const key = getCartKey(usuario?.id);
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  });
  const prevUserId = useRef(usuario?.id);

  const clearCart = () => setCart([]);

  // Efecto para limpiar el carrito solo cuando cambia el usuario
  useEffect(() => {
    if (prevUserId.current !== usuario?.id) {
      clearCart();
    }
    prevUserId.current = usuario?.id;
  }, [usuario?.id]);

  useEffect(() => {
    const key = getCartKey(usuario?.id);
    const stored = sessionStorage.getItem(key);
    setCart(stored ? JSON.parse(stored) : []);
    prevUserId.current = usuario?.id;
    // No necesitas llamar a clearCart aquí, solo cargar el carrito correcto
  }, [usuario?.id]);

  useEffect(() => {
    const key = getCartKey(usuario?.id);
    sessionStorage.setItem(key, JSON.stringify(cart));
  }, [cart, usuario?.id]);

  const addToCart = (producto: Producto) => {
    setCart(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + (producto.cantidad || 1) }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: producto.cantidad || 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, cantidad: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, cantidad) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};