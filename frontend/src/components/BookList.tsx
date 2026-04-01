import { useEffect, useState } from 'react';
import type { Book, BooksResponse } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import '../styles/BookList.css';
import type { SortableColumn } from './SortControls';

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

  // Fetch current books
  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `Categorytypes=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5001/Book/AllBooks?BookQty=${pageSize}&PageNum=${pageNum}${categoryParams ? `&${categoryParams}` : ''}`,
      );
      const data: BooksResponse = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  // Clamp invalid pages
  useEffect(() => {
    if (pageNum > (totalPages || 1)) {
      setPageNum(totalPages || 1);
    }
  }, [pageNum, totalPages, setPageNum]);

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

      <div className="book-list__meta">
        <p className="book-list__status">
          Showing page {pageNum} of {totalPages || 1} ({totalItems} books)
        </p>
        <nav aria-label="Book list pages" className="book-list__pagination">
          <ul className="pagination mb-0">
            <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${pageNum === index + 1 ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => setPageNum(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPageNum(pageNum + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="book-list__page-size">
        <label htmlFor="pageSize" className="book-list__page-size-label">
          Results Per Page:
        </label>
        <select
          id="pageSize"
          className="book-list__page-size-select"
          value={pageSize}
          onChange={(e) => {
            // Reset to first page
            setPageSize(Number(e.target.value));
            setPageNum(1);
          }}
        >
          <option value="8">8</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
}

export default BookList;
