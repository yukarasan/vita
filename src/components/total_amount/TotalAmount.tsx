import { useState, useEffect } from "react";
import { Item } from "../../models/Item";
import './TotalAmount.css';

interface TotalAmountProps {
  basket: Item[];
}

const TotalAmount: React.FC<TotalAmountProps> = ({ basket }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const amount = basket.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalAmount(amount);
  }, [basket]);

  // Separate the currency code and amount for individual styling
  const currencyCode = "DKK";
  const formattedAmount = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'DKK', minimumFractionDigits: 2 }).format(totalAmount).replace("DKK", "").trim();

  return (
    <div className="total-amount-container">
      <h2 className="total">Total</h2>
      <span className="currency-code">{currencyCode}</span>
      <span className="amount">{formattedAmount}</span>
    </div>
  );
};

export default TotalAmount;
