import React, { useState } from 'react';
import './DeliveryAdress.css'; 

const DeliveryAddress = () => {
  // State variable to track same address for billing
  const [useSameAddress, setUseSameAddress] = useState(false);
  // State for delivery address fields
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
    country: 'Denmark', 
  });

  const [zipCodeValidation, setZipCodeValidation] = useState({ valid: true, message: '' });

  // Event handler to update delivery address
  const handleDeliveryAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDeliveryAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
    // Validate postal code as it's being typed
    if (name === 'postalCode') {
      handleZipCodeValidation(value);
    }
  };

  // Event handler to update billing address
  const handleBillingAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBillingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Event handler to toggle whether to use the same address for billing
  const handleUseSameAddressToggle = () => {
    setUseSameAddress((prev) => !prev);
    if (!useSameAddress) {
      // If previously not selected, copy delivery address to billing address
      setBillingAddress({ ...deliveryAddress });
    }
  };

  // Function to validate zip code against the provided list
  const handleZipCodeValidation = async (zipCode: string) => {
    try {
      const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zipCode}`);
      if (response.ok) {
        const zipCodeData = await response.json();
        // Check if the zip code is found in Denmark
        if (zipCodeData) {
          setZipCodeValidation({ valid: true, message: 'Valid zip code for Denmark.' });
        } else {
          setZipCodeValidation({ valid: false, message: 'Zip code not found in Denmark.' });
        }
      } else {
        setZipCodeValidation({ valid: false, message: 'Failed to validate zip code.' });
      }
    } catch (error) {
      setZipCodeValidation({ valid: false, message: 'Error validating zip code.' });
    }
  };

  //for invalid zip code
  const zipCodeClassName = zipCodeValidation.valid ? '' : 'invalid';

  return (
    <div className="delivery-address">
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
          className={zipCodeClassName}
        />
        {/* Display zip code validation message */}
        {!zipCodeValidation.valid && <p className="validation-message">{zipCodeValidation.message}</p>}
      </div>
      {/* Checkbox to use the same address for billing */}
      <div className="use-same-address-container">
        <input
          type="checkbox"
          id="useSameAddress"
          checked={useSameAddress}
          onChange={handleUseSameAddressToggle}
        />
        <label htmlFor="useSameAddress">Use same address for billing</label>
      </div>
      {/* Billing Address */}
      {!useSameAddress && (
        <div className="address-container">
          <h2>Billing Address</h2>
          <input
            type="text"
            name="street"
            value={billingAddress.street}
            onChange={handleBillingAddressChange}
            placeholder="Street"
          />
          <input
            type="text"
            name="city"
            value={billingAddress.city}
            onChange={handleBillingAddressChange}
            placeholder="City"
          />
          <input
            type="text"
            name="postalCode"
            value={billingAddress.postalCode}
            onChange={handleBillingAddressChange}
            placeholder="Postal Code"
          />
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
