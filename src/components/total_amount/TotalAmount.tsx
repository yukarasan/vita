import React from 'react';

interface TotalAmountProps {
  amount: number;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ amount }) => {
  return (
    <div>
      <h2>Total Amount: {amount.toFixed(2)}</h2>
    </div>
  );
};

export default TotalAmount;
