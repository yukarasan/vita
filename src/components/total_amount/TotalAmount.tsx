import { useState, useEffect } from "react";
import { CartItemType } from "../../lib/types";
import "./TotalAmount.css";

interface TotalAmountProps {
  cart: CartItemType[];
}

const TotalAmount: React.FC<TotalAmountProps> = ({ cart }) => {
  // State for total amount
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Calculate total amount
  useEffect(() => {
    // Calculate total amount without discount
    const calculatedTotal = cart.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);

    // Apply discount if total amount is over 300 DKK
    const discountThreshold = 300;
    const discountedTotal = calculatedTotal >= discountThreshold ? calculatedTotal * 0.9 : calculatedTotal;

    // Update total amount state
    setTotalAmount(discountedTotal);
    
  }, [cart]);

  // Separate the currency code and amount for individual styling
  const currencyCode = "DKK";
  const formattedTotalAmount = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2,
  })
    .format(totalAmount)
    .replace("DKK", "")
    .trim();

  return (
    <div className="total-amount-container">
      <h2 className="total">Total</h2>
      <span className="currency-code">{currencyCode}</span>
      <span className="amount">{formattedTotalAmount}</span>
    </div>
  );
};

export default TotalAmount;
