type BookPaginationProps = {
  totalItems: number;
  totalPages: number;
  pageNum: number;
  pageSize: number;
  setPageNum: (value: number) => void;
  setPageSize: (value: number) => void;
};

function BookPagination({
  totalItems,
  totalPages,
  pageNum,
  pageSize,
  setPageNum,
  setPageSize,
}: BookPaginationProps) {
  return (
    <>
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
    </>
  );
}

export default BookPagination;
