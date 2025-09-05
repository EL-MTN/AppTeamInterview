'use client';

import { useState, useEffect } from 'react';
import { CartItem, Cart } from '@/types/cart';

const CART_STORAGE_KEY = 'green-thumb-cart';

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateCartTotals = (items: CartItem[]): { total: number; itemCount: number } => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount };
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        cartItem => cartItem.id === item.id && cartItem.size === item.size
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        newItems = [...prevCart.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        newItems = [...prevCart.items, { ...item, quantity }];
      }

      const { total, itemCount } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        total,
        itemCount,
      };
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(
        item => !(item.id === id && item.size === size)
      );
      const { total, itemCount } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        total,
        itemCount,
      };
    });
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item => 
        item.id === id && item.size === size 
          ? { ...item, quantity }
          : item
      );
      const { total, itemCount } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        total,
        itemCount,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
