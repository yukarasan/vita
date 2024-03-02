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

    if (name === 'phone') {
      if (!/^\d*$/.test(value) || value.length > 8) {
        return; 
      }
    }

    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={userInfo.name}
        onChange={handleInputChange}
        placeholder="Full Name"
      />
      <input
        type="tel"
        name="phone"
        value={userInfo.phone}
        onChange={handleInputChange}
        placeholder="Phone e.g., 40964767"
        pattern="[0-9]*"
        inputMode="numeric"
      />
      <input
        type="email"
        name="email"
        value={userInfo.email}
        onChange={handleInputChange}
        placeholder="Email Address"
      />
      {!emailValid && <p className="email-error">Please enter a valid email address.</p>}
      <input
        type="text"
        name="companyName"
        value={userInfo.companyName}
        onChange={handleInputChange}
        placeholder="Company Name"
      />
      <input
        type="text"
        name="vatNumber"
        value={userInfo.vatNumber}
        onChange={handleInputChange}
        placeholder="VAT Number (8 digits for Denmark)"
      />
    </div>
  );
};
