import { useState, useEffect } from "react"
import { CartItem } from "../../lib/types"
import "./TotalAmount.css"

interface TotalAmountProps {
  cart: CartItem[]
}

const TotalAmount: React.FC<TotalAmountProps> = ({ cart }) => {
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    const amount = cart.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    )
    setTotalAmount(amount)
  }, [cart])

  // Separate the currency code and amount for individual styling
  const currencyCode = "DKK"
  const formattedAmount = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2,
  })
    .format(totalAmount)
    .replace("DKK", "")
    .trim()

  return (
    <div className="total-amount-container">
      <h2 className="total">Total</h2>
      <span className="currency-code">{currencyCode}</span>
      <span className="amount">{formattedAmount}</span>
    </div>
  )
}

export default TotalAmount
