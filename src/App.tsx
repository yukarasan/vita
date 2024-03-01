import { useState } from "react";
import "./assets/styles/App.css";

import CartList from "./components/cart_list/CartList";
import TotalAmount from "./components/total_amount/TotalAmount";
import { CartItemType } from "./lib/types";
import Cart from "./data/Cart";

function App() {
  const [cart, setCart] = useState<CartItemType[]>(Cart.getInitialCart());
  const totalItems = cart.length;

  return (
    <div className="App">
      <header>
        <h1>Checkout</h1>
        <p>Cart ({totalItems} items)</p>
      </header>
      <main className="checkout-layout">
        <div className="cart-container">
          <CartList cart={cart} setCart={setCart} />
        </div>
        <div className="order-summary">
          <TotalAmount cart={cart} />
        </div>
      </main>
    </div>
  );
}
export default App;
