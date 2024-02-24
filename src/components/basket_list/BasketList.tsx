import { Item } from "../../models/Item"
import BasketItem from "../basket_item/BasketItem"
import "./BasketList.css"

interface BasketListProps {
  basket: Item[]
  setBasket: React.Dispatch<React.SetStateAction<Item[]>>
}

const BasketList: React.FC<BasketListProps> = ({ basket, setBasket }) => {
  return (
    <div>
      {basket?.length > 0 ? (
        <ul className="basket-list">
          <div className="basket-header">
            <p className="basket-list-name">Product</p>
            <p>Quantity</p>
            <p>Total Price</p>
          </div>
          {basket.map((product) => (
            <BasketItem
              key={product.id}
              product={product}
              setBasket={setBasket}
            />
          ))}
        </ul>
      ) : (
        <p>Your basket is empty.</p>
      )}
    </div>
  )
}

export default BasketList
