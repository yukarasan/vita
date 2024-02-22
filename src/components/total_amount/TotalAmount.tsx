import React from 'react';

interface TotalAmountProps {
  amount: number;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ amount }) => {
  console.log('Current total amount:', amount); // Add console log here
  return (
    <div>
      <h2>Total Amount: {amount.toFixed(2)}</h2>
    </div>
  );
};

export default TotalAmount;
