import { CartItemType, CatalogItemType } from "../../lib/types"
import CartItem from "../cart_item/CartItem"
import "./CartList.css"

interface CartListProps {
  cart: CartItemType[]
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>
  onUpgrade: (product: CatalogItemType) => void; // Define the onUpgrade function
}



const CartList: React.FC<CartListProps> = ({ cart, setCart, onUpgrade }) => {
  return (
    <div className="cart-list-container">
      {cart.length > 0 ? (
        <ul className="cart-list">
          {cart.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} setCart={setCart} onUpgrade={onUpgrade} />
            ))}
        </ul>
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}
    </div>
  )
}

export default CartList