import { useState } from 'react';
import { DeliveryAddress } from '../delivery_address/DeliveryAddress';
import { useNavigate } from 'react-router-dom';
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate(); // v6
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleSubmitOrder = async () => {
    // Implement the logic to submit the order
    
    // For demonstration, let's assume the order is submitted successfully
    console.log('Order is submitted');
    
    // Set order submitted to true
    setOrderSubmitted(true);


    navigate('/order-success'); // Navigate to the order success page
  };

  return (
    <div className="checkout-container">
      {!orderSubmitted ? (
        <>
          <DeliveryAddress />
          <button onClick={handleSubmitOrder} className="submit-order-btn">
            Submit Order
          </button>
        </>
      ) : (
        <div className="order-success-message">
          <h2>Thank you!</h2>
          <p>Your order has been submitted successfully.</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
