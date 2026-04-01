import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookPage from './pages/BookPage';
import BuyPage from './pages/BuyPage';
import CartPage from './pages/CartPage';
import CartSummary from './components/CartSummary';
import { CartProvider } from './context/CartContext';

function App() {
  // Provide cart state
  return (
    <CartProvider>  
      <Router>
        {/* Set up routes */}
        <CartSummary />
        <Routes>
          <Route path="/" element={<BookPage />} />
          <Route path="/add/:bookId/:bookName/:bookPrice" element={<BuyPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
