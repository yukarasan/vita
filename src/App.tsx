import React, { useState, useEffect } from 'react';
import './assets/styles/App.css';
import CartList from './components/cart_list/CartList';
import TotalAmount from './components/total_amount/TotalAmount';
import { CartItemType } from './lib/types';
import Cart from './data/Cart';
import { DeliveryAddress } from './components/delivery_address/DeliveryAddress';

function App() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    vatNumber: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const initialCart = Cart.getInitialCart().map(item => {
      let recurringOrder: 'none' | 'weekly' | 'monthly';
      switch (item.recurringOrder) {
        case 'weekly':
          recurringOrder = 'weekly';
          break;
        case 'monthly':
          recurringOrder = 'monthly';
          break;
        default:
          recurringOrder = 'none';
      }

      return {
        ...item,
        recurringOrder
      };
    });

    setCart(initialCart);
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://eo30byi91bvqxol.m.pipedream.net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart,
          deliveryAddress: DeliveryAddress,
          userInfo,
        }),
      });
  
      if (response.ok) {
        alert('Order submitted successfully!');
      } else {
        // Handle error response
        alert('Failed to submit order. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('An error occurred while submitting the order.');
    }
  };

  const handleUserInfoChange = (newUserInfo) => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      ...newUserInfo
    }));
  };
  
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
      {totalItems > 0 && <DeliveryAddress onUserInfoChange={handleUserInfoChange} />}
    <input
      type="checkbox"
      checked={termsAccepted}
      onChange={(e) => setTermsAccepted(e.target.checked)}
    />
    <label htmlFor="termsAccepted">I accept the terms & conditions</label>
    <button onClick={handleSubmit} disabled={!termsAccepted}>
      Submit Order
    </button>
    </div>
  );
}

export default App;
