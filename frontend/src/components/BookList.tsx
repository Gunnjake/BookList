import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import '../styles/BookList.css';
import type { SortableColumn } from './SortControls';
import BookPagination from './BookPagination';
import { fetchBooks } from '../api/ProjectAPI';

type ProjectListProps = {
  selectedCategories: string[];
  sortColumn: SortableColumn;
  sortOrder: 'asc' | 'desc';
  pageSize: number;
  pageNum: number;
  setPageSize: (value: number) => void;
  setPageNum: (value: number) => void;
};

function BookList({
  selectedCategories,
  sortColumn,
  sortOrder,
  pageSize,
  pageNum,
  setPageSize,
  setPageNum,
}: ProjectListProps){
  const [books, setBooks] = useState<Book[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);

  // Fetch current books
  useEffect(() => {
    const loadBooks = async () => {
     try{
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.books);
        setTotalItems(data.totalNumBooks);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
     } catch (err) {
        setError((err as Error).message || 'An error occurred while fetching books.');
     } finally {
        setLoading(false);  
     }
    };

    void loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) {
    return <p className="book-list__loading">Loading books...</p>;
  }

  if (error) {
    return <p className="book-list__error">{error}</p>;
  }


  // Sort visible books
  const displayedBooks = [...books].sort((a, b) => {
    const leftValue = a[sortColumn];
    const rightValue = b[sortColumn];

    if (typeof leftValue === 'number' && typeof rightValue === 'number') {
      return sortOrder === 'asc' ? leftValue - rightValue : rightValue - leftValue;
    }

    const comparison = String(leftValue).localeCompare(String(rightValue), undefined, {
      numeric: true,
      sensitivity: 'base',
    });

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="book-list">
      <div className="book-list__grid">
        {displayedBooks.map((book) => (
          <div key={book.bookId}>
          <article className="book-list__card card h-100 shadow-sm">
            <div className="book-list__card-body">
              <span className="book-list__badge badge rounded-pill text-bg-light">{book.category}</span>
              <h3 className="book-list__title">{book.title}</h3>
              <p className="book-list__author">by {book.author}</p>

              <div className="book-list__details">
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Classification:</strong> {book.classification}</p>
                <p><strong>Pages:</strong> {book.pageCount}</p>
              </div>
            </div>

            <div className="book-list__purchase">
              <p className="book-list__price">${book.price.toFixed(2)}</p>
              <button
                type="button"
                className="btn book-list__cart-button"
                onClick={() => navigate(`/add/${book.bookId}/${book.title}/${book.price}`)}
              >
                Add to Cart
              </button>
            </div>
          </article>
          </div>
        ))}
      </div>

      <BookPagination
        totalItems={totalItems}
        totalPages={totalPages}
        pageNum={pageNum}
        pageSize={pageSize}
        setPageNum={setPageNum}
        setPageSize={setPageSize}
      />
    </div>
  );
}

export default BookList;
