import { CartItemType } from "../../lib/types"
import { useState } from "react"
import "./QuantitySelector.css"

interface QuantitySelectorProps {
  cartItem: CartItemType;
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  onIncrease: (id: string) => void; // New callback prop
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  cartItem,
  setCart,
  onIncrease
}) => {
  const [inputQuantity, setInputQuantity] = useState(
    cartItem.quantity.toString()
  )

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantityStr = event.target.value.replace(/\D/g, "") // Only keep digits
    if (newQuantityStr.length > 2) {
      newQuantityStr = newQuantityStr.slice(0, 2) // Limit string to two digits
    }
    const newQuantity = newQuantityStr
      ? Math.min(parseInt(newQuantityStr, 10), 99)
      : 1

    setInputQuantity(newQuantityStr)
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItem.id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleBlur = () => {
    const newQuantity = inputQuantity
      ? Math.max(1, Math.min(parseInt(inputQuantity, 10), 99))
      : 1
    setInputQuantity(newQuantity.toString())
    if (newQuantity !== cartItem.quantity) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === cartItem.id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const handleDecreaseQuantity = () => {
    if (cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1
      setInputQuantity(newQuantity.toString())
      setCart((prev) =>
        prev.map((item) =>
          item.id === cartItem.id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const handleIncreaseQuantity = () => {
    if (cartItem.quantity < 99) {
      const newQuantity = cartItem.quantity + 1;
      setInputQuantity(newQuantity.toString());
      setCart((prev) =>
        prev.map((item) =>
          item.id === cartItem.id ? { ...item, quantity: newQuantity } : item
        )
      );
      onIncrease(cartItem.id); // Call the callback with the item's id
    }
  };

  return (
    <div className="quantity-selector">
      <button
        onClick={handleDecreaseQuantity}
        disabled={cartItem.quantity <= 1}
      >
        -
      </button>
      <input
        type="text"
        value={inputQuantity}
        onChange={handleQuantityChange}
        onBlur={handleBlur}
        maxLength={2} // HTML attribute to limit input to two characters
        pattern="\d*"
        className="quantity-input" // Added a class for styling
      />
      <button
        onClick={handleIncreaseQuantity}
        disabled={cartItem.quantity >= 99}
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector
