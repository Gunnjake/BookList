// Book API shape
export interface Book {
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

// Paged books response
export interface BooksResponse {
  books: Book[];
  totalNumBooks: number;
}
