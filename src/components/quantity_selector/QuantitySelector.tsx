import { Item } from "../../models/Item"

interface QuantitySelectorProps {
  product: Item
  setBasket: React.Dispatch<React.SetStateAction<Item[]>>
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  product,
  setBasket,
}) => {
  const handleDecreaseQuantity = () => {
    setBasket((prev) => {
      const updatedBasket = prev.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantity: p.quantity - 1 }
        }
        return p
      })
      return updatedBasket
    })
  }

  const handleIncreaseQuantity = () => {
    setBasket((prev) => {
      const updatedBasket = prev.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantity: p.quantity + 1 }
        }
        return p
      })
      return updatedBasket
    })
  }

  return (
    <div className="quantity-selector">
      <button onClick={handleDecreaseQuantity} disabled={product.quantity < 2}>
        -
      </button>
      <p>{product.quantity}</p>
      <button
        onClick={handleIncreaseQuantity}
        disabled={product.quantity >= 99}
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector
