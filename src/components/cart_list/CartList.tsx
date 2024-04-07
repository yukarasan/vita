import { CartItemType } from "../../lib/types"
import CartItem from "../cart_item/CartItem"
import "./CartList.css"

interface CartListProps {
  cart: CartItemType[]
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>
  onUpgrade: (productId: string) => void; // Update the type to accept string
}

const CartList: React.FC<CartListProps> = ({ cart, setCart, onUpgrade }) => {
  const handleUpgrade = (productId: string) => {
    // Call the upgrade function passed from the App component
    onUpgrade(productId);
  };

  return (
    <div className="cart-list-container">
      {cart.length > 0 ? (
        <ul className="cart-list">
          {cart.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} setCart={setCart} onUpgrade={() => handleUpgrade(cartItem.id)} /> // Pass onUpgrade with the product ID
          ))}
        </ul>
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}
    </div>
  )
}

export default CartList