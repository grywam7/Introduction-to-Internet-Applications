import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/Products';

interface CartItem extends Product {
  quantity: number; // Ilość danego produktu w koszyku
}

interface Order {
  username: string; // Nazwa użytkownika
  items: { productId: number; quantity: number }[]; // Produkty w zamówieniu
  total: number; // Łączna kwota zamówienia
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  orders: Order[]; // Historia zamówień
  placeOrder: (username: string) => void; // Zatwierdzenie zamówienia
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]); // Historia zamówień

  // Ładowanie koszyka i zamówień z localStorage przy starcie aplikacji
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedOrders = localStorage.getItem('orders');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  // Zapisywanie koszyka i zamówień do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = (username: string) => {
    const newOrder: Order = {
      username,
      items: cart.map((item) => ({ productId: item.id, quantity: item.quantity })),
      total: totalPrice,
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    clearCart(); // Po złożeniu zamówienia koszyk zostaje wyczyszczony
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        orders,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
