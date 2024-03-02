import React, { useState } from 'react';
import "./UserInformation.css"

export const UserInformation = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    vatNumber: '',
  });
  const [emailValid, setEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    if (email === "") {
      return true; 
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmailValid(validateEmail(value));
    }

    if (name === 'phone' || name === 'vatNumber') {
      if (!/^\d*$/.test(value) || value.length > 8) {
        return; 
      }
    }

    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
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
      <label className="input-label">Phone <span className="required-asterisk">*</span></label>      
      <input
        type="tel"
        name="phone"
        value={userInfo.phone}
        onChange={handleInputChange}
        placeholder="Phone e.g., 40464269"
        pattern="[0-9]*"
        inputMode="numeric"
        className="input-field"
        required
      />
      <label className="input-label">Email Address <span className="required-asterisk">*</span></label>      
      <input
        type="email"
        name="email"
        value={userInfo.email}
        onChange={handleInputChange}
        placeholder="E-mail e.g., vita@vita.com"
        className="input-field"
        required
      />
      {!emailValid && <p className="email-error">Please enter a valid email address.</p>}
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
