import React, { useState } from 'react';
import './assets/styles/App.css';
import CartList from './components/cart_list/CartList';
import TotalAmount from './components/total_amount/TotalAmount';
import { CartItemType } from './lib/types';
import Cart from './data/Cart';

function App() {
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'Denmark', // Default to Denmark
  });
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'Denmark', // Default to Denmark
  });

  // Event handler to update delivery address
  const handleDeliveryAddressChange = (event) => {
    const { name, value } = event.target;
    setDeliveryAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Event handler to update billing address
  const handleBillingAddressChange = (event) => {
    const { name, value } = event.target;
    setBillingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const [cart, setCart] = useState<CartItemType[]>(Cart.getInitialCart());
  const totalItems = cart.length;

  // State variable to track same address for billing
  const [useSameAddress, setUseSameAddress] = useState(false);

  // Event handler to toggle whether to use the same address for billing
  const handleUseSameAddressToggle = () => {
    setUseSameAddress((prev) => !prev);
    if (useSameAddress) {
      // If previously selected, clear billing address fields
      setBillingAddress({
        street: '',
        city: '',
        postalCode: '',
        country: 'Denmark', // Default to Denmark
      });
    } else {
      // If previously not selected, copy delivery address to billing address
      setBillingAddress({ ...deliveryAddress });
    }
  };

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

      <div className="address-section">
        {/* Delivery Address */}
        <div className="address-container">
          <h2>Delivery Address</h2>
          <input
            type="text"
            name="street"
            value={deliveryAddress.street}
            onChange={handleDeliveryAddressChange}
            placeholder="Street"
          />
          <input
            type="text"
            name="city"
            value={deliveryAddress.city}
            onChange={handleDeliveryAddressChange}
            placeholder="City"
          />
          <input
            type="text"
            name="postalCode"
            value={deliveryAddress.postalCode}
            onChange={handleDeliveryAddressChange}
            placeholder="Postal Code"
          />
        </div>

        {/* Billing Address */}
        <div className="address-container">
          <h2>Billing Address</h2>
          <div className="billing-same-address">
            <input
              type="checkbox"
              checked={useSameAddress}
              onChange={handleUseSameAddressToggle}
            />
            <label>Use the same address for billing</label>
          </div>
          <input
            type="text"
            name="street"
            value={billingAddress.street}
            onChange={handleBillingAddressChange}
            placeholder="Street"
            disabled={useSameAddress}
          />
          <input
            type="text"
            name="city"
            value={billingAddress.city}
            onChange={handleBillingAddressChange}
            placeholder="City"
            disabled={useSameAddress}
          />
          <input
            type="text"
            name="postalCode"
            value={billingAddress.postalCode}
            onChange={handleBillingAddressChange}
            placeholder="Postal Code"
            disabled={useSameAddress}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
