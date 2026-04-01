import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { addBook, deleteBook, fetchBooks, updateBook } from '../api/ProjectAPI';
import BookPagination from '../components/BookPagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';
import '../styles/BookList.css';
import '../styles/BookPage.css';

function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [pageNum, setPageNum] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Fetch admin books
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBooks(pageSize, pageNum, []);
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    } catch (err) {
      setError((err as Error).message || 'Failed to load admin books.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBooks();
  }, [pageSize, pageNum]);

  // Clamp invalid pages
  useEffect(() => {
    if (pageNum > (totalPages || 1)) {
      setPageNum(totalPages || 1);
    }
  }, [pageNum, totalPages]);

  // Add new book
  const handleAddBook = async (book: Book) => {
    await addBook(book);
    setIsAdding(false);
    await loadBooks();
  };

  // Save edited book
  const handleEditBook = async (book: Book) => {
    await updateBook(book);
    setEditingBook(null);
    await loadBooks();
  };

  // Confirm before deleting
  const handleDeleteBook = async (bookId: number) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    await deleteBook(bookId);
    await loadBooks();
  };

  return (
    <div className="book-page">
      <div className="row justify-content-center">
        <div className="col-12">
          <section className="book-page__hero text-center">
            <h1 className="book-page__title mb-4">Admin Books</h1>
            <p className="book-page__subtitle">
              Manage the bookstore catalog from one place.
            </p>
          </section>

          <div className="book-page__content">
            {isAdding ? (
              <NewBookForm
                onSuccess={handleAddBook}
                onCancel={() => setIsAdding(false)}
              />
            ) : editingBook ? (
              <EditBookForm
                book={editingBook}
                onSuccess={handleEditBook}
                onCancel={() => setEditingBook(null)}
              />
            ) : (
              <>
                <div className="d-flex justify-content-end mb-3">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setIsAdding(true)}
                  >
                    Add Book
                  </button>
                </div>

                {loading && <p className="book-list__loading">Loading books...</p>}
                {error && <p className="book-list__error">{error}</p>}

                {!loading && !error && (
                  <div className="book-list">
                    <div className="table-responsive bg-white border rounded">
                      <table className="table table-striped table-hover mb-0 align-middle">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Category</th>
                            <th scope="col">Publisher</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Class</th>
                            <th scope="col">Pages</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {books.map((book) => (
                            <tr key={book.bookId}>
                              <td>{book.title}</td>
                              <td>{book.author}</td>
                              <td>{book.category}</td>
                              <td>{book.publisher}</td>
                              <td>{book.isbn}</td>
                              <td>{book.classification}</td>
                              <td>{book.pageCount}</td>
                              <td>${book.price.toFixed(2)}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => setEditingBook(book)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => void handleDeleteBook(book.bookId)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBooks;
