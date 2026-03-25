import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";
import '../styles/CartPage.css';

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart } = useCart();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return(
        <div className="cart-page">
            <div className="cart-page__shell">
            <h2 className="cart-page__title">Your Cart</h2>
            <div>
                {cart.length === 0 ? (
                    <p className="cart-page__empty">Your cart is empty.</p>
                ) : ( 
                    <ul className="cart-page__list">
                        {cart.map((item: CartItem) => (
                            <li key={item.bookId} 
                            className="cart-page__item">
                                <div className="cart-page__item-copy">
                                    <span className="cart-page__item-title">{item.title}</span>
                                    <span className="cart-page__item-meta">
                                        Qty {item.quantity} x ${item.price.toFixed(2)} = ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                                <button className="btn btn-danger btn-sm cart-page__button" onClick={() => removeFromCart(item.bookId)}>
                                    Remove
                                </button> 
                            </li>
                        ))}
                    </ul> 
                )}
            </div>
            <div className="cart-page__totals">
                <span className="cart-page__total-label">Subtotal</span>
                <span className="cart-page__total-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-page__actions">
            <button className="btn btn-primary cart-page__button">Checkout</button>
            <button className="btn btn-outline-danger cart-page__button" onClick={clearCart}>Clear Cart</button>
            <button className="btn btn-outline-dark cart-page__button" onClick={() => navigate('/')}>Continue Browsing </button>
            </div>
            </div>
        </div>
    );
}

export default CartPage;
