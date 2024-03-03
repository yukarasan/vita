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

  const totalSavings = originalTotal - totalAmount;
  const formattedTotalSavings = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2,
  }).format(totalSavings).replace("DKK", "").trim();

  return (
    <div className="total-amount-container">
      <h2 className="total">Total</h2>
      {totalAmount !== originalTotal && (
        <>
          <div className="original-amount">
            <span className="currency-code">DKK</span>
            <span className="amount strikethrough">{originalTotal.toFixed(2)}</span>
          </div>
        </>
      )}
      <div>
        <span className="currency-code">DKK</span>
        <span className="amount">{totalAmount.toFixed(2)}</span>
      </div>
      
      <h2 className="totalSavings">Savings</h2>
      <div className="savings">
            <span>You saved: </span>
            <span className="currency-code">DKK</span>
            <span className="amount">{formattedTotalSavings}</span>
      </div>

    </div>
  );
};

export default TotalAmount;
