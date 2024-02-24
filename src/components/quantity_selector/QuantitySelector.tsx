import { Item } from "../../models/Item";
import { useState } from "react";
import "./QuantitySelector.css"

interface QuantitySelectorProps {
  product: Item;
  setBasket: React.Dispatch<React.SetStateAction<Item[]>>;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  product,
  setBasket,
}) => {
  const [inputQuantity, setInputQuantity] = useState(product.quantity.toString());

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setInputQuantity(newQuantity); // Update the input field
  };

  const handleBlur = () => {
    const newQuantity = Math.max(1, Math.min(parseInt(inputQuantity, 10), 99));
    if (newQuantity !== product.quantity) {
      setInputQuantity(newQuantity.toString());
      setBasket((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, quantity: newQuantity } : p))
      );
    }
  };

  const handleDecreaseQuantity = () => {
    if (product.quantity > 1) {
      const newQuantity = product.quantity - 1;
      setInputQuantity(newQuantity.toString());
      setBasket((prev) => prev.map((p) => (p.id === product.id ? { ...p, quantity: newQuantity } : p)));
    }
  };

  const handleIncreaseQuantity = () => {
    if (product.quantity < 99) {
      const newQuantity = product.quantity + 1;
      setInputQuantity(newQuantity.toString());
      setBasket((prev) => prev.map((p) => (p.id === product.id ? { ...p, quantity: newQuantity } : p)));
    }
  };

  return (
    <div className="quantity-selector">
      <button onClick={handleDecreaseQuantity} disabled={product.quantity <= 1}>
        -
      </button>
      <input
        type="text" 
        value={inputQuantity}
        onChange={handleQuantityChange}
        onBlur={handleBlur}
        pattern="\d*"  
      />
      <button onClick={handleIncreaseQuantity} disabled={product.quantity >= 99}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
