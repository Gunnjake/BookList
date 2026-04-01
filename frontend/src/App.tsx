import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import BookPage from './pages/BookPage';
import BuyPage from './pages/BuyPage';
import CartPage from './pages/CartPage';
import AdminBooks from './pages/AdminBooks';
import CartSummary from './components/CartSummary';
import { CartProvider } from './context/CartContext';

function AppContent() {
  const location = useLocation();
  // Hide cart on admin
  const showCartSummary = location.pathname !== '/admin/books';

  return (
    <>
      {showCartSummary && <CartSummary />}
      <Routes>
        <Route path="/" element={<BookPage />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/add/:bookId/:bookName/:bookPrice" element={<BuyPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

function App() {
  // Provide cart state
  return (
    <CartProvider>  
      <Router>
        {/* Set up routes */}
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
