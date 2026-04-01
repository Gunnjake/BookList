import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import '../styles/CartSummary.css';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  // Sum cart value
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Count cart items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Jump to cart
  return (
    <div className="cart-summary" onClick={() => navigate("/cart")}>
      <span className="cart-summary__icon" aria-hidden="true">🛒</span>
      <div className="cart-summary__content">
        <span className="cart-summary__label">Cart</span>
        <strong className="cart-summary__value">{totalItems} items | ${totalAmount.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default CartSummary;
