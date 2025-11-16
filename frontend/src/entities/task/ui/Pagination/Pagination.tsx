import "./Pagination.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // 👇 Генерация массива страниц, если страниц немного
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button
        className="pagination__nav"
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        <FiChevronLeft />
      </button>

      <div className="pagination__pages">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination__page ${
              page === currentPage ? "active" : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination__nav"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};
