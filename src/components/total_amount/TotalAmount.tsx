import { useState, useEffect } from "react";
import { CartItemType } from "../../lib/types";
import "./TotalAmount.css";

interface TotalAmountProps {
  cart: CartItemType[];
}

const TotalAmount: React.FC<TotalAmountProps> = ({ cart }) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [originalTotal, setOriginalTotal] = useState<number>(0);

  useEffect(() => {
    let newTotal = 0;
    let newOriginalTotal = 0;

    cart.forEach(cartItem => {
      const itemTotalWithoutRebate = cartItem.price * cartItem.quantity;
      const rebate = cartItem.quantity >= cartItem.rebateQuantity 
                     ? itemTotalWithoutRebate * (cartItem.rebatePercent / 100) 
                     : 0;
      newTotal += itemTotalWithoutRebate - rebate;
      newOriginalTotal += itemTotalWithoutRebate;
    });

    setTotalAmount(newTotal);
    setOriginalTotal(newOriginalTotal);
  }, [cart]);

  const currencyCode = "DKK";
  const formattedTotalAmount = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2,
  }).format(totalAmount).replace("DKK", "").trim();

  const formattedOriginalTotalAmount = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2,
  }).format(originalTotal).replace("DKK", "").trim();

  return (
    <div className="total-amount-container">
      <h2 className="total">Total</h2>
      {totalAmount !== originalTotal && (
        <div className="original-amount">
          <span className="currency-code">{currencyCode}</span>
          <span className="amount strikethrough">{formattedOriginalTotalAmount}</span>
        </div>
      )}
      <div>
        <span className="currency-code">{currencyCode}</span>
        <span className="amount">{formattedTotalAmount}</span>
      </div>
    </div>
  );
};

export default TotalAmount;
