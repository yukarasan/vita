import React, { useState } from 'react';

export const UserInformation = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    vatNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
        type="text"
        name="phone"
        value={userInfo.phone}
        onChange={handleInputChange}
        placeholder="Phone (8 digits for Denmark)"
      />
      <input
        type="email"
        name="email"
        value={userInfo.email}
        onChange={handleInputChange}
        placeholder="Email Address"
      />
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
