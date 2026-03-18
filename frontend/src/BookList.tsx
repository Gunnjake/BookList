import { useEffect, useState } from 'react';
import type { Book, BooksResponse } from './types/Book';

type SortableColumn =
  | 'title'
  | 'author'
  | 'publisher'
  | 'isbn'
  | 'classification'
  | 'category'
  | 'pageCount'
  | 'price';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortColumn, setSortColumn] = useState<SortableColumn>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Load books
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5001/Book/AllBooks?BookQty=${pageSize}&PageNum=${pageNum}`,
      );
      const data: BooksResponse = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum]);

  // Sort rows
  const displayedBooks = [...books].sort((a, b) => {
    const leftValue = a[sortColumn];
    const rightValue = b[sortColumn];

    // Compare numbers
    if (typeof leftValue === 'number' && typeof rightValue === 'number') {
      return sortOrder === 'asc' ? leftValue - rightValue : rightValue - leftValue;
    }

    // Compare text
    const comparison = String(leftValue).localeCompare(String(rightValue), undefined, {
      numeric: true,
      sensitivity: 'base',
    });

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Toggle sort
  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortOrder((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortColumn(column);
    setSortOrder('asc');
  };

  // Header control
  const renderSortButton = (label: string, column: SortableColumn) => (
    <button
      type="button"
      className="title-sort-button"
      onClick={() => handleSort(column)}
    >
      {label}
      <span className="title-sort-arrows" aria-hidden="true">
        <span className={sortColumn === column && sortOrder === 'asc' ? 'is-active' : ''}>
          ▲
        </span>
        <span className={sortColumn === column && sortOrder === 'desc' ? 'is-active' : ''}>
          ▼
        </span>
      </span>
    </button>
  );

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center mb-4">Book List</h1>
          <p className="text-center text-muted mb-4">
            Browse, sort, and page through Professor Hilton&apos;s recommended books.
          </p>
          {/* Book table */}
          <div className="table-responsive mb-4">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>{renderSortButton('Title', 'title')}</th>
                  <th>{renderSortButton('Author', 'author')}</th>
                  <th>{renderSortButton('Publisher', 'publisher')}</th>
                  <th>{renderSortButton('ISBN', 'isbn')}</th>
                  <th>{renderSortButton('Classification', 'classification')}</th>
                  <th>{renderSortButton('Category', 'category')}</th>
                  <th>{renderSortButton('Pages', 'pageCount')}</th>
                  <th>{renderSortButton('Price', 'price')}</th>
                </tr>
              </thead>
              <tbody>
                {displayedBooks.map((book) => (
                  <tr key={book.bookId}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.isbn}</td>
                    <td>{book.classification}</td>
                    <td>{book.category}</td>
                    <td>{book.pageCount}</td>
                    <td>${book.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Page controls */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <p className="mb-0">
              Showing page {pageNum} of {totalPages || 1} ({totalItems} books)
            </p>
            <nav aria-label="Book list pages">
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
          {/* Page size */}
          <div className="mt-3 d-flex align-items-center gap-2">
            <label htmlFor="pageSize" className="form-label mb-0">
              Results Per Page:
            </label>
            <select
              id="pageSize"
              className="form-select w-auto"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageNum(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookList;
