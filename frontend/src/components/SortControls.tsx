import { useState } from 'react';
import '../styles/SortControls.css';

export type SortableColumn =
  | 'title'
  | 'author'
  | 'publisher'
  | 'isbn'
  | 'classification'
  | 'category'
  | 'pageCount'
  | 'price';

type SortControlsProps = {
  sortColumn: SortableColumn;
  sortOrder: 'asc' | 'desc';
  onSort: (column: SortableColumn) => void;
};

function SortControls({ sortColumn, sortOrder, onSort }: SortControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortLabelMap: Record<SortableColumn, string> = {
    title: 'Title',
    author: 'Author',
    publisher: 'Publisher',
    isbn: 'ISBN',
    classification: 'Classification',
    category: 'Category',
    pageCount: 'Pages',
    price: 'Price',
  };

  const renderSortButton = (label: string, column: SortableColumn) => (
    <button
      type="button"
      className="sort-controls__button"
      onClick={() => {
        onSort(column);
        setIsOpen(false);
      }}
    >
      {label}
      <span className="sort-controls__arrows" aria-hidden="true">
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
    <section className="sort-controls">
      <div className="sort-controls__header">
        <div>
          <span className="sort-controls__label">Sort by</span>
          <p className="sort-controls__summary">
            {sortLabelMap[sortColumn]} ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </p>
        </div>
        <button
          type="button"
          className="sort-controls__toggle"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
        >
          Sort Options
          <span className={`sort-controls__chevron ${isOpen ? 'is-open' : ''}`}>▼</span>
        </button>
      </div>
      {isOpen && (
        <div className="sort-controls__grid">
          {renderSortButton('Title', 'title')}
          {renderSortButton('Author', 'author')}
          {renderSortButton('Publisher', 'publisher')}
          {renderSortButton('ISBN', 'isbn')}
          {renderSortButton('Classification', 'classification')}
          {renderSortButton('Category', 'category')}
          {renderSortButton('Pages', 'pageCount')}
          {renderSortButton('Price', 'price')}
        </div>
      )}
    </section>
  );
}

export default SortControls;
