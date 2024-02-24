import { Item } from "../../models/Item";
import BasketItem from "../basket_item/BasketItem";
import "./BasketList.css";

interface BasketListProps {
  basket: Item[];
  setBasket: React.Dispatch<React.SetStateAction<Item[]>>;
}

const BasketList: React.FC<BasketListProps> = ({ basket, setBasket }) => {
  return (
    <div className="basket-list-container"> {/* Rename the class for styling */}
      {basket.length > 0 ? (
        <ul className="basket-list">
          {basket.map((product) => (
            <BasketItem
              key={product.id}
              product={product}
              setBasket={setBasket}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-basket-message">Your basket is empty.</p> 
      )} {/* Add a class for styling */}
    </div>
  );
};

export default BasketList;
