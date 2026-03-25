import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";
import '../styles/BuyPage.css';

function BuyPage() {
    const navigate = useNavigate();
    const { bookName, bookId, bookPrice } = useParams();
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            title: bookName || "Unknown Book",
            price: Number(bookPrice) || 0,
            quantity: 1,
        };
        addToCart(newItem);
        navigate("/cart");
    };

    return (
            <div className="buy-page container">
                <div className="buy-page__card">
                    <span className="buy-page__eyebrow">Purchase</span>
                    <h2 className="buy-page__title">Buy {bookName}</h2>
                    <p className="buy-page__price">Unit Price: <strong>${bookPrice}</strong></p>
                    <div className="buy-page__actions">
                    <button className="btn btn-primary buy-page__button" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                    <button className="btn btn-dark buy-page__button" onClick={() => navigate(-1)}>
                        Back to Books
                    </button>
                    </div>
                </div>
            </div>
    );
}

export default BuyPage;
