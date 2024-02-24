import { useState, useEffect } from "react"
import { Item } from "../../models/Item"

interface TotalAmountProps {
  basket: Item[]
}

const TotalAmount: React.FC<TotalAmountProps> = ({ basket }) => {
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    const amount = basket.reduce((acc, product) => {
      return acc + product.price * product.quantity
    }, 0)
    setTotalAmount(amount)
  }, [basket])

  return (
    <div>
      <h2>Total Amount: {totalAmount}</h2>
    </div>
  )
}

export default TotalAmount
