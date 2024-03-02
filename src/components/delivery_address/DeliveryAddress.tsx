import React, { useState } from 'react';
import './DeliveryAddress.css';

export const DeliveryAddress = () => {
  const [useSameAddress, setUseSameAddress] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'Denmark',
  });
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'Denmark',
  });
  const [zipCodeValidation, setZipCodeValidation] = useState({ valid: true, message: '' });
  const [zipCodeValidationBilling, setZipCodeValidationBilling] = useState({ valid: true, message: '' });

  const handleAddressChange = (isBilling = false) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (isBilling) {
      setBillingAddress((prev) => ({ ...prev, [name]: value }));
      if (name === 'postalCode') {
        await handleZipCodeValidation(value, true);
      }
    } else {
      setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
      if (name === 'postalCode') {
        await handleZipCodeValidation(value);
      }
    }
  };

  const handleZipCodeValidation = async (zipCode: string, isBilling = false) => {
    const updateState = isBilling ? setZipCodeValidationBilling : setZipCodeValidation;
    const setAddress = isBilling ? setBillingAddress : setDeliveryAddress;

    try {
      const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zipCode}`);
      if (response.ok) {
        const zipCodeData = await response.json();
        if (zipCodeData && zipCodeData.navn) {
          updateState({ valid: true, message: 'Valid zip code for Denmark.' });
          setAddress((prevAddress) => ({
            ...prevAddress,
            city: zipCodeData.navn,
            postalCode: zipCode,
          }));
        } else {
          updateState({ valid: false, message: 'Zip code not found in Denmark.' });
        }
      } else {
        updateState({ valid: false, message: 'Failed to validate zip code.' });
      }
    } catch (error) {
      updateState({ valid: false, message: 'Error validating zip code.' });
    }
  };

  const handleUseSameAddressToggle = () => {
    setUseSameAddress(!useSameAddress);
    if (!useSameAddress) {
      setBillingAddress({ ...deliveryAddress });
      setZipCodeValidationBilling({ ...zipCodeValidation });
    }
  };

  const getZipCodeClassName = (isValid: boolean) => (isValid ? '' : 'invalid');

  return (
    <div className="delivery-address">
      <div className="address-container">
        <h2>Delivery Address</h2>
        <input
          type="text"
          name="postalCode"
          value={deliveryAddress.postalCode}
          onChange={handleAddressChange()}
          placeholder="Postal Code"
          className={getZipCodeClassName(zipCodeValidation.valid)}
        />
        {!zipCodeValidation.valid && <p className="validation-message">{zipCodeValidation.message}</p>}
        <input
          type="text"
          name="street"
          value={deliveryAddress.street}
          onChange={handleAddressChange()}
          placeholder="Street"
        />
        <input
          type="text"
          name="city"
          value={deliveryAddress.city}
          onChange={handleAddressChange()}
          placeholder="City"
        />
      </div>
      <div className="use-same-address-container">
        <input
          type="checkbox"
          id="useSameAddress"
          checked={useSameAddress}
          onChange={handleUseSameAddressToggle}
        />
        <label htmlFor="useSameAddress">Use same address for billing</label>
      </div>
      {!useSameAddress && (
        <div className="address-container">
          <h2>Billing Address</h2>
          <input
            type="text"
            name="postalCode"
            value={billingAddress.postalCode}
            onChange={handleAddressChange(true)}
            placeholder="Postal Code"
            className={getZipCodeClassName(zipCodeValidationBilling.valid)}
          />
          {!zipCodeValidationBilling.valid && <p className="billing-validation-message">{zipCodeValidationBilling.message}</p>}
          <input
            type="text"
            name="street"
            value={billingAddress.street}
            onChange={handleAddressChange(true)}
            placeholder="Street"
          />
          <input
            type="text"
            name="city"
            value={billingAddress.city}
            onChange={handleAddressChange(true)}
            placeholder="City"
          />
        </div>
      )}
    </div>
  );
};
