import { useState } from 'react';
import './assets/styles/App.css';
import CartList from './components/cart_list/CartList';
import TotalAmount from './components/total_amount/TotalAmount';
import { CartItemType } from './lib/types';
import Cart from './data/Cart';
import { DeliveryAddress } from './components/delivery_address/DeliveryAddress';

function App() {
  const [cart, setCart] = useState<CartItemType[]>(Cart.getInitialCart());
  const totalItems = cart.length;

  return (
    <div className="App">
      <header>
        <h1>Cart</h1>
        <p>You have ({totalItems}) items in total</p>
      </header>
      <main className="checkout-layout">
        <div className="cart-container">
          <CartList cart={cart} setCart={setCart} />
        </div>
        <div className="order-summary">
          <TotalAmount cart={cart} />
        </div>
      </main>
      {totalItems > 0 && <DeliveryAddress />}
    </div>
  );
}

export default App;


// TODO: Visual feedback on total for savings! 
