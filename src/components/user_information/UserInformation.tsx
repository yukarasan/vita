import React, { useState, Dispatch, SetStateAction } from 'react';
import './UserInformation.css';
import { UserInfo } from '../../lib/types';

interface UserInformationProps {
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
}

export const UserInformation: React.FC<UserInformationProps> = ({ userInfo, setUserInfo }) => {
  const [emailValid, setEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    if (email.trim() === "") {
      return true;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedUserInfo = { ...userInfo, [name]: value };

    if (name === 'email') {
      const isValid = validateEmail(value);
      setEmailValid(isValid); // Update the email validity state
      // Allow the state to update even if the email format is incorrect
    }

    if (name === 'phone' || name === 'vatNumber') {
      if (!/^\d*$/.test(value) || value.length > 8) {
        // Prevent the state from updating for these conditions
        return;
      }
    }

    setUserInfo(updatedUserInfo);
  };

  return (
    <div>
      <h2 className="user-information-h2">Your Information</h2>
      
      <label className="input-label">Full Name <span className="required-asterisk">*</span></label>
      <input
        type="text"
        name="name"
        value={userInfo.name}
        onChange={handleInputChange}
        placeholder="Full name"
        className="input-field"
        required
      />
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <select 
          name="countryCode" 
          value='+45' // Hardcoded value
          className="input-field" 
          style={{ marginRight: '8px' }}>
          <option value="+45">🇩🇰 +45</option>
          <option value="+46">🇸🇪 +46</option>
          <option value="+47">🇳🇴 +47</option>
          <option value="+47">🇹🇷 +90</option>
          <option value="+47">🇵🇰 +92</option>
          <option value="+47">🇦🇫 +93</option>
        </select>

        <input
          type="tel"
          name="phone"
          value={userInfo.phone}
          onChange={handleInputChange}
          placeholder="Phone number"
          className="input-field"
          required
        />
      </div>
      
      <label className="input-label">Email Address <span className="required-asterisk">*</span></label>
      <input
        type="email"
        name="email"
        value={userInfo.email}
        onChange={handleInputChange}
        placeholder="E-mail e.g., vita@vita.com"
        className={`input-field ${!emailValid ? 'invalid' : ''}`}
        required
      />
      {/* Optionally show an error message if the email is invalid */}
      {!emailValid && <p className="error-message">Invalid email format</p>}
      
      <label className="input-label">Company Name</label>
      <input
        type="text"
        name="companyName"
        value={userInfo.companyName}
        onChange={handleInputChange}
        placeholder="Company Name"
        className="input-field"
      />
      
      <label className="input-label">Vat Number</label>
      <input
        type="text"
        name="vatNumber"
        value={userInfo.vatNumber}
        onChange={handleInputChange}
        placeholder="VAT Number (8 digits for Denmark)"
        className="input-field"
      />
    </div>
  );
};
