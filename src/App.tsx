import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './assets/styles/App.css';
import CartList from './components/cart_list/CartList';
import TotalAmount from './components/total_amount/TotalAmount';
import { CartItemType } from './lib/types';
import Cart from './data/Cart';
import Checkout from './components/checkout/Checkout';
import { UserInfo, Address } from './lib/types';

interface HomeProps {
  cart: CartItemType[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  totalItems: number;
}

// Home page
const Home: React.FC<HomeProps> = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const loadInitialCart = async () => {
      if (cart.length === 0 && isFirstLoad) {
        const initialCartItems = await Cart.getInitialCart();
        setCart(initialCartItems);
        setIsFirstLoad(false);
      }
    };
  
    loadInitialCart();
  }, [cart, isFirstLoad, setCart]);

  const handleNavigateToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <div className="cart-container">
        <CartList cart={cart} setCart={setCart} />
      </div>
      {cart.length > 0 && ( 
        <div className="order-summary">
          <TotalAmount cart={cart} />
          <button onClick={handleNavigateToCheckout} className="proceed-checkout-btn">
            Checkout
          </button>
        </div>
      )}
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
  const [cart, setCart] = useState<CartItemType[]>([]);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    vatNumber: '',
  });

  const [deliveryAddress, setDeliveryAddress] = useState<Address>({
    addressline1: '',
    addressline2: '',
    city: '',
    postalCode: '',
    country: 'Denmark',
  });
  const [billingAddress, setBillingAddress] = useState<Address>({
    addressline1: '',
    addressline2: '',
    city: '',
    postalCode: '',
    country: 'Denmark',
  });

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main className="checkout-layout">
          <Routes>
            <Route path="/" element={<Home cart={cart} setCart={setCart} totalItems={totalItems} />} />
            <Route path="/checkout" element={
              <Checkout
                cart={cart}
                totalItems={totalItems} 
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                deliveryAddress={deliveryAddress}
                billingAddress={billingAddress}
                setDeliveryAddress={setDeliveryAddress}
                setBillingAddress={setBillingAddress}
              />
            } />
          </Routes>
        </main>
        {showBackToTop && (
          <button onClick={scrollToTop} className="back-to-top-btn">
            Go Back to Top
          </button>
        )}
      </div>
    </Router>
  );
}


export default App;