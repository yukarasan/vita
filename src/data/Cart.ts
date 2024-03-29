// Cart.js or wherever your Cart class is defined
import { CartItemType } from '../lib/types';

class Cart {
  static async getInitialCart(): Promise<CartItemType[]> {
    try {
      const response = await fetch("https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const items: CartItemType[] = await response.json();
      // Assuming you need to add a default quantity for each item
      const cartItems = items.map(item => ({
        ...item,
        quantity: 1, // or any other logic to determine initial quantity
      }));
      return cartItems;
    } catch (error) {
      console.error("Failed to fetch initial cart items:", error);
      return []; // Return an empty array as a fallback
    }
  }
}

export default Cart;
