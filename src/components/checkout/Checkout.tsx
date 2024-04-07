// Checkout.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliveryAddress } from '../delivery_address/DeliveryAddress';
import { CheckoutProps } from '../../lib/types';
import "./Checkout.css";

const Checkout: React.FC<CheckoutProps> = ({
  cart,
  // totalItems,
  userInfo,
  setUserInfo,
  deliveryAddress,
  setDeliveryAddress,
  billingAddress,
  setBillingAddress,
}) => {
  const navigate = useNavigate();
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [receiveMarketing, setReceiveMarketing] = useState(false);
  const [orderComment, setOrderComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateFields = () => {
    if (!userInfo.name) return { valid: false, message: "Please fill out your name." };
    if (!userInfo.phone) return { valid: false, message: "Please enter your phone number." };
    if (!userInfo.email) return { valid: false, message: "Please enter your e-mail address." };
  
    if (!deliveryAddress.addressline1) return { valid: false, message: 'Please fill out your delivery address.' };
    if (!deliveryAddress.city) return { valid: false, message: 'Please fill out your city.' };
    if (!deliveryAddress.postalCode) return { valid: false, message: 'Please fill out your postal code.' };
  
    if (!billingAddress.addressline1) return { valid: false, message: 'Please fill out your billing address.' };
    if (!billingAddress.city) return { valid: false, message: 'Please fill out your billing city.' };
    if (!billingAddress.postalCode) return { valid: false, message: 'Please fill out your billing postal code.' };
  
    if (!termsAccepted) return { valid: false, message: 'You must accept the terms and conditions to proceed.' };
  
    return { valid: true };
  };
  
  const handleSubmitOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setAttemptedSubmit(true);
  
    const validation = validateFields();
    if (!validation.valid) {
      setError(validation.message || "An unexpected error occurred");
      setLoading(false);
      return;
    }
  
    setError("");
    try {
      await fetch('https://webhook.site/e907b0ec-d359-4997-80e5-0cae155d7337', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          cart, userInfo, deliveryAddress, billingAddress, termsAccepted, receiveMarketing, orderComment,
        }),
      });
      setOrderSubmitted(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('An error occurred while submitting the order.');
    }
    setLoading(false);
  };  

  if (orderSubmitted) {
    return (
      <div className="order-success-message">
        <h2>Thank you!</h2>
        <p>Your order has been submitted successfully.</p>
        <button onClick={() => navigate('/')} className="back-to-home-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="checkout-container">
        <button onClick={() => navigate(-1)} className="back-button">
          <span className="bold-arrow">&#x2190;</span>
        </button>

        <form onSubmit={handleSubmitOrder} ref={formRef} noValidate className={attemptedSubmit ? "form-attempted-submit" : ""}>
          <DeliveryAddress 
            userInfo={userInfo} 
            setUserInfo={setUserInfo} 
            deliveryAddress={deliveryAddress} 
            setDeliveryAddress={setDeliveryAddress} 
            billingAddress={billingAddress} 
            setBillingAddress={setBillingAddress} 
          />

          <div className="checkbox-container">
            <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="input-checkbox" />
            <label htmlFor="terms" className="checkbox-label">Accept Terms & Conditions</label>
          </div>

          <div className="checkbox-container">
            <input type="checkbox" id="marketing" checked={receiveMarketing} onChange={(e) => setReceiveMarketing(e.target.checked)} className="input-checkbox" />
            <label htmlFor="marketing" className="checkbox-label">Receive marketing emails</label>
          </div>

          <textarea placeholder="Order comment (optional)" value={orderComment} onChange={(e) => setOrderComment(e.target.value)} />
          
          <button type="submit" className="submit-order-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Order"}
          </button>
          {error && <p className="form-error-message">{error}</p>}
        </form>
      </div>
    </>
    
  );
};

export default Checkout;


// Production: 
    /**
     try {
      const response = await fetch('https://eo30byi91bvqxol.m.pipedream.net', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          // The userInfo and deliveryAddress need to be handled accordingly
          userInfo: {}, // This should be updated to include actual userInfo
          deliveryAddress: {}, // You need to fetch this from <DeliveryAddress />
          termsAccepted,
          receiveMarketing,
          orderComment,
        }),
      });

      if (response.ok) {
        setOrderSubmitted(true);
        // navigate('/order-success');
      } else {
        setError('Failed to submit order. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('An error occurred while submitting the order.');
    }
     */