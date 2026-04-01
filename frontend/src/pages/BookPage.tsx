import '../styles/BookPage.css';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import { useEffect, useState } from 'react';
import SortControls, { type SortableColumn } from '../components/SortControls';

const BOOK_PAGE_STORAGE_KEY = 'bookstore_book_page_state';

type BookPageState = {
  selectedCategories?: string[];
  sortColumn?: SortableColumn;
  sortOrder?: 'asc' | 'desc';
  pageSize?: number;
  pageNum?: number;
};

// Restore saved filters
const getSavedBookPageState = (): BookPageState => {
  const savedState = sessionStorage.getItem(BOOK_PAGE_STORAGE_KEY);
  return savedState ? (JSON.parse(savedState) as BookPageState) : {};
};

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    () => getSavedBookPageState().selectedCategories ?? [],
  );
  const [sortColumn, setSortColumn] = useState<SortableColumn>(
    () => getSavedBookPageState().sortColumn ?? 'title',
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    () => getSavedBookPageState().sortOrder ?? 'asc',
  );
  const [pageSize, setPageSize] = useState<number>(
    () => getSavedBookPageState().pageSize ?? 8,
  );
  const [pageNum, setPageNum] = useState<number>(
    () => getSavedBookPageState().pageNum ?? 1,
  );

  // Save current page state
  useEffect(() => {
    sessionStorage.setItem(
      BOOK_PAGE_STORAGE_KEY,
      JSON.stringify({ selectedCategories, sortColumn, sortOrder, pageSize, pageNum }),
    );
  }, [selectedCategories, sortColumn, sortOrder, pageSize, pageNum]);

  // Toggle active sort order
  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortOrder((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortColumn(column);
    setSortOrder('asc');
  };

  return (
    <div className="book-page">
      <div className="row justify-content-center">
        <div className="col-12">
          <section className="book-page__hero text-center">
            <h1 className="book-page__title mb-4">Book List</h1>
            <p className="book-page__subtitle">
              Browse, sort, and page through Professor Hilton&apos;s recommended books.
            </p>
          </section>
          <div className="book-page__content">
            <div className="book-page__toolbar">
              <CategoryFilter
                selectedCategories={selectedCategories}
                onCheckboxChange={(categories) => {
                  // Reset after filtering
                  setSelectedCategories(categories ? categories.split(',') : []);
                  setPageNum(1);
                }}
              />
              <SortControls
                sortColumn={sortColumn}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
            </div>
            <BookList
              selectedCategories={selectedCategories}
              sortColumn={sortColumn}
              sortOrder={sortOrder}
              pageSize={pageSize}
              pageNum={pageNum}
              setPageSize={setPageSize}
              setPageNum={setPageNum}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
