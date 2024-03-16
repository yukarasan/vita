import React, { useState } from 'react';
import './DeliveryAddress.css';
import { UserInformation } from '../user_information/UserInformation';
import { render } from '@testing-library/react';

export const DeliveryAddress = ({ handleSubmit }: { handleSubmit: () => Promise<void> }) => {
  const [useSameAddress, setUseSameAddress] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    addressline1: '',
    addressline2: '',
    city: '',
    postalCode: '',
    country: 'Denmark',
  });
  const [billingAddress, setBillingAddress] = useState({
    addressline1: '',
    addressline2: '',
    city: '',
    postalCode: '',
    country: 'Denmark',
  });
  const [zipCodeValidation, setZipCodeValidation] = useState({ valid: true, message: '' });
  const [zipCodeValidationBilling, setZipCodeValidationBilling] = useState({ valid: true, message: '' });

  const isValidPostalCode = (postalCode: string) => {
    const numericCode = Number(postalCode);
    return /^\d{4}$/.test(postalCode) && numericCode >= 1000 && numericCode <= 9999;
  };
  
  const handleAddressChange = (isBilling = false) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'postalCode' && (value.length > 4 || !/^\d*$/.test(value))) {
        return;
    }

    const updateAddress = isBilling ? setBillingAddress : setDeliveryAddress;
    updateAddress(prev => ({ ...prev, [name]: value }));

    if (name === 'postalCode') {
      const isValid = isValidPostalCode(value);
      const updateState = isBilling ? setZipCodeValidationBilling : setZipCodeValidation;
      updateState({
        valid: isValid,
        message: isValid ? '' : 'Postal code must be between 1000 and 9999.'
      });

      if (isValid) {
        await handleZipCodeValidation(value, isBilling);
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

  const mockHandleSubmit = jest.fn();

test('renders DeliveryAddress component', () => {
  render(<DeliveryAddress handleSubmit={mockHandleSubmit} />);
});

  const getZipCodeClassName = (isValid: boolean) => (isValid ? '' : 'invalid');

  return (
    <div className="delivery-address">
      <div className="address-container">
        <h2>Delivery Address</h2>
        <label className="input-label">Postal Code <span className="required-asterisk">*</span></label>
        <input
          type="tel"
          name="postalCode"
          value={deliveryAddress.postalCode}
          onChange={handleAddressChange()}
          placeholder="Postal Code"
          className={`input-field ${getZipCodeClassName(zipCodeValidation.valid)}`}
          pattern="[0-9]*" 
          inputMode="numeric"
          required
        />
        {!zipCodeValidation.valid && <p className="validation-message">{zipCodeValidation.message}</p>}
        
        <label className="input-label">City <span className="required-asterisk">*</span></label>
        <input
          type="text"
          name="city"
          value={deliveryAddress.city}
          onChange={handleAddressChange()}
          placeholder="City"
          className="input-field"
          required
        />
        
        <label className="input-label">Address line 1 <span className="required-asterisk">*</span></label>
        <input
          type="text"
          name="addressline1"
          value={deliveryAddress.addressline1}
          onChange={handleAddressChange()}
          placeholder="e.g. Heimdalsvej 64"
          className="input-field"
          required
        />

        <label className="input-label">Address Line 2</label>
        <input
          type="text"
          name="addressline2"
          value={deliveryAddress.addressline2}
          onChange={handleAddressChange()}
          placeholder="e.g. 3th"
          className="input-field"
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

      <div className="address-container">
        <h2>Billing Address</h2>

        <label className="input-label">Postal Code <span className="required-asterisk">*</span></label>
        <input
          type="tel"
          name="postalCode"
          value={billingAddress.postalCode}
          onChange={handleAddressChange(true)}
          placeholder="Postal Code"
          className={`input-field ${getZipCodeClassName(zipCodeValidationBilling.valid)}`}
          pattern="[0-9]*" 
          inputMode="numeric"
        />
        {!zipCodeValidationBilling.valid && <p className="billing-validation-message">{zipCodeValidationBilling.message}</p>}

        <label className="input-label">City <span className="required-asterisk">*</span></label>
        <input
          type="text"
          name="city"
          value={billingAddress.city}
          onChange={handleAddressChange(true)}
          placeholder="City"
        />

        <label className="input-label">Address line 1 <span className="required-asterisk">*</span></label>
        <input
          type="text"
          name="addressline1"
          value={billingAddress.addressline1}
          onChange={handleAddressChange(true)}
          placeholder="e.g. Heimdalsvej 64"
          className="input-field"
          required
        />

        <label className="input-label">Address line 2</label>
        <input
          type="text"
          name="addressline2"
          value={billingAddress.addressline2}
          onChange={handleAddressChange(true)}
          placeholder="e.g. 3th"
          className="input-field"
        />

      </div>
      {/* User Information Section */}
      <UserInformation handleSubmit={handleSubmit} />
    </div>
  );
  
};
