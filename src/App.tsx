// App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './assets/styles/App.css';
import CartList from './components/cart_list/CartList';
import TotalAmount from './components/total_amount/TotalAmount';
import { CartItemType } from './lib/types';
import Cart from './data/Cart';
import Checkout from './components/checkout/Checkout';

// Home page
const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItemType[]>([]);

  useEffect(() => {
    const initialCart = Cart.getInitialCart();
    setCart(initialCart);
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const handleNavigateToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <div className="cart-container">
        <CartList cart={cart} setCart={setCart} />
      </div>
      <div className="order-summary">
        <TotalAmount cart={cart} />
        {totalItems > 0 && (
          <button onClick={handleNavigateToCheckout} className="proceed-checkout-btn">
            Checkout
          </button>
        )}
      </div>
    </>
  );
};

function AppHeader() {
  const location = useLocation(); // This is fine as AppHeader is rendered inside Router

  if (location.pathname === '/checkout') {
    return (
      <header>
        <h1>Checkout</h1>
      </header>
    );
  }

  return (
    <header>
      <h1>Your Cart</h1>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main className="checkout-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
