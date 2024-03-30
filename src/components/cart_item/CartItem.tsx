import { useState, useEffect } from "react";
import { CartItemType, CatalogItemType } from "../../lib/types";
import QuantitySelector from "../quantity_selector/QuantitySelector";
import "./CartItem.css";

interface CartItemProps {
  cartItem: CartItemType;
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem, setCart }) => {
  const [upsellProduct, setUpsellProduct] = useState<CatalogItemType>();
  const [itemTotal, setItemTotal] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [triggerPulseId, setTriggerPulseId] = useState<string | null>(null);

  const rebateAmount = cartItem.quantity >= cartItem.rebateQuantity
    ? cartItem.price * cartItem.quantity * (cartItem.rebatePercent / 100)
    : 0;

  useEffect(() => {
    const calculatedTotal = cartItem.price * cartItem.quantity - rebateAmount;
    setItemTotal(calculatedTotal);
  }, [cartItem.quantity, cartItem.price, rebateAmount]);

  const handleRemoveCartItem = () => {
    setCart((prev) => prev.filter((item) => item.id !== cartItem.id));
  };

  const handleGiftWrapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItem.id ? { ...item, giftWrap: event.target.checked } : item
      )
    );
  };

  const handleItemIncrease = (id: string) => {
    setTriggerPulseId(id); // Set the id of the item being increased to trigger the pulse effect
  
    // Reset the pulse trigger after the animation
    setTimeout(() => {
      setTriggerPulseId(null); // Clear the trigger to reset the pulse effect
    }, 500);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json");
        const data = await response.json();
        const item = data.find((item: CatalogItemType) => item.id === cartItem.upsellProductId);
        setUpsellProduct(item);
        setImageUrl(cartItem.upsellProductId ? item?.imageUrl || '' : cartItem.imageUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [cartItem.upsellProductId, cartItem.imageUrl]);

  const formattedTotal = itemTotal.toFixed(2);

  const handleCalcRebate = () => {
    if (cartItem.quantity < cartItem.rebateQuantity) {
      return (
        <p key={`no-discount-${cartItem.quantity}`}>
          Buy {cartItem.rebateQuantity - cartItem.quantity} more for a discount!
        </p>
      );
    } else if (cartItem.rebateQuantity !== 0 && cartItem.rebatePercent > 0) {
      // Apply "animate-pulse" class only if this item's ID matches the triggerPulseId
      const pulseClass = cartItem.id === triggerPulseId ? 'animate-pulse' : '';
      return (
        <p className={`${pulseClass}`} key={`discount-${cartItem.quantity}-${Date.now()}`}>
          You saved {cartItem.rebatePercent}% on this item!
        </p>
      );
    }
  };  

  return (
    <li className="cart-item">
      <div className="cart-item-top">
        <span className="cart-item-name">{cartItem.name}</span>
        <span className="cart-item-price">{cartItem.price} kr</span>
        <QuantitySelector setCart={setCart} cartItem={cartItem} onIncrease={handleItemIncrease} />
        <span className="cart-item-total">{formattedTotal} kr</span>
          {handleCalcRebate()}
        <p>{upsellProduct && upsellProduct.name}</p>
        <img src={imageUrl} alt="Upsell Product Image" width="100" height="100" className="cart-item-image" />

        <button className="cart-item-button" onClick={handleRemoveCartItem}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="cart-item-remove-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
      <div className="gift-wrap-container">
        <label className="gift-wrap-checkbox">
          🎁 Gift wrap this order?
          <input
            type="checkbox"
            checked={cartItem.giftWrap}
            onChange={handleGiftWrapChange}
          />
        </label>
      </div>
      <span className="rebate-amount">Total Saved: {rebateAmount.toFixed(2)} kr</span>
    </li>
  );
};

export default CartItem;
