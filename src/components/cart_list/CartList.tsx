import { CartItemType } from "../../lib/types"
import CartItem from "../cart_item/CartItem"
import "./CartList.css"

interface CartListProps {
  cart: CartItemType[]
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>
}

const CartList: React.FC<CartListProps> = ({ cart, setCart }) => {
  return (
    <div className="cart-list-container">
      {/* Rename the class for styling */}
      {cart.length > 0 ? (
        <ul className="cart-list">
          {cart.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} setCart={setCart} />
          ))}
        </ul>
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}
      {/* Add a class for styling */}
    </div>
  )
}

export default CartList
