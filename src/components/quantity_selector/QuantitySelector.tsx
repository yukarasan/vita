import React from 'react';

interface QuantitySelectorProps {
  value: number;
  onChange: (newValue: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, onChange }) => {
  // Ensure the value is always within acceptable bounds (e.g., 1 to 99)
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue) || newValue < 1) {
      newValue = 1;
    } else if (newValue > 99) {
      newValue = 99;
    }
    console.log('New quantity:', newValue); // Add this line
    onChange(newValue);
  };

  // Increment and decrement functions for the quantity
  const increment = () => {
    if (value < 99) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <div>
      <button onClick={decrement} disabled={value <= 1}>-</button>
      <input type="number" value={value} onChange={handleQuantityChange} min="1" max="99" />
      <button onClick={increment} disabled={value >= 99}>+</button>
    </div>
  );
};

export default QuantitySelector;
