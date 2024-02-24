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
    let newQuantityStr = event.target.value.replace(/\D/g, ''); // Only keep digits
    if (newQuantityStr.length > 2) {
      newQuantityStr = newQuantityStr.slice(0, 2); // Limit string to two digits
    }
    const newQuantity = newQuantityStr ? Math.min(parseInt(newQuantityStr, 10), 99) : 1;
    
    setInputQuantity(newQuantityStr); 
    setBasket((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, quantity: newQuantity } : p))
    );
  };

  const handleBlur = () => {
    const newQuantity = inputQuantity ? Math.max(1, Math.min(parseInt(inputQuantity, 10), 99)) : 1;
    setInputQuantity(newQuantity.toString());
    if (newQuantity !== product.quantity) {
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
        maxLength={2} // HTML attribute to limit input to two characters
        pattern="\d*"  
        className="quantity-input" // Added a class for styling
      />
      <button onClick={handleIncreaseQuantity} disabled={product.quantity >= 99}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
