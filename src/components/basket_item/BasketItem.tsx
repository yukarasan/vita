import { Item } from "../../models/Item"
import QuantitySelector from "../quantity_selector/QuantitySelector"
import "./BaksetItem.css"

interface BasketItemProps {
  product: Item
  setBasket: React.Dispatch<React.SetStateAction<Item[]>>
}

const BasketItem: React.FC<BasketItemProps> = ({ product, setBasket }) => {
  const handleRemoveProduct = () => {
    setBasket((prev: Item[]) => prev.filter((p) => p.id !== product.id))
  }

  // Format price with two decimal places
  const formattedPrice = product.price.toFixed(2);
  const formattedTotal = (product.price * product.quantity).toFixed(2);

  return (
    <li>
      <div className="basket-item">
        <div className="basket-item-details">
          <h3 className="basket-item-name">{product.title}</h3>
          <p>{formattedPrice} kr</p>
        </div>
        <QuantitySelector setBasket={setBasket} product={product} />
        <p>{formattedTotal} kr</p>
        <button className="basket-item-button" onClick={handleRemoveProduct}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="basket-item-remove-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default BasketItem;
