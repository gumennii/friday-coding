import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  search: string;
}

export function Pagination({
  currentPage,
  totalPages,
  search,
}: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", page.toString());
    return `?${params.toString()}#results`;
  };

  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav
      className="flex items-center justify-between sm:justify-center"
      aria-label="Pagination"
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          href={createPageUrl(Math.max(1, currentPage - 1))}
          className={`relative inline-flex items-center rounded-solace px-4 py-2 text-sm font-medium ${
            currentPage === 1
              ? "cursor-not-allowed bg-solace-gray-100 text-solace-gray-400"
              : "border border-solace-gray-200 bg-white text-solace-gray-700 hover:bg-solace-gray-50"
          }`}
          aria-disabled={currentPage === 1}
        >
          Previous
        </Link>
        <Link
          href={createPageUrl(Math.min(totalPages, currentPage + 1))}
          className={`relative ml-3 inline-flex items-center rounded-solace px-4 py-2 text-sm font-medium ${
            currentPage === totalPages
              ? "cursor-not-allowed bg-solace-gray-100 text-solace-gray-400"
              : "border border-solace-gray-200 bg-white text-solace-gray-700 hover:bg-solace-gray-50"
          }`}
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Link>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-solace shadow-solace"
            aria-label="Pagination"
          >
            {/* Previous button */}
            <Link
              href={createPageUrl(Math.max(1, currentPage - 1))}
              className={`relative inline-flex items-center rounded-l-solace border px-3 py-2 ${
                currentPage === 1
                  ? "cursor-not-allowed border-solace-gray-200 bg-solace-gray-100 text-solace-gray-300"
                  : "border-solace-gray-200 bg-white text-solace-gray-500 hover:bg-solace-gray-50"
              } text-sm font-medium transition-colors`}
              aria-disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            {/* First page if not in range */}
            {pageNumbers[0] > 1 && (
              <>
                <Link
                  href={createPageUrl(1)}
                  className="relative inline-flex items-center border border-solace-gray-200 bg-white px-4 py-2 text-sm font-medium text-solace-gray-700 transition-colors hover:bg-solace-gray-50"
                >
                  1
                </Link>
                {pageNumbers[0] > 2 && (
                  <span className="relative inline-flex items-center border border-solace-gray-200 bg-white px-4 py-2 text-sm font-medium text-solace-gray-700">
                    ...
                  </span>
                )}
              </>
            )}

            {/* Page numbers */}
            {pageNumbers.map((page) => (
              <Link
                key={page}
                href={createPageUrl(page)}
                className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "z-10 border-solace-gold bg-solace-gold-light text-solace-gray-800"
                    : "border-solace-gray-200 bg-white text-solace-gray-700 hover:bg-solace-gray-50"
                }`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </Link>
            ))}

            {/* Last page if not in range */}
            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                  <span className="relative inline-flex items-center border border-solace-gray-200 bg-white px-4 py-2 text-sm font-medium text-solace-gray-700">
                    ...
                  </span>
                )}
                <Link
                  href={createPageUrl(totalPages)}
                  className="relative inline-flex items-center border border-solace-gray-200 bg-white px-4 py-2 text-sm font-medium text-solace-gray-700 transition-colors hover:bg-solace-gray-50"
                >
                  {totalPages}
                </Link>
              </>
            )}

            {/* Next button */}
            <Link
              href={createPageUrl(Math.min(totalPages, currentPage + 1))}
              className={`relative inline-flex items-center rounded-r-solace border px-3 py-2 ${
                currentPage === totalPages
                  ? "cursor-not-allowed border-solace-gray-200 bg-solace-gray-100 text-solace-gray-300"
                  : "border-solace-gray-200 bg-white text-solace-gray-500 hover:bg-solace-gray-50"
              } text-sm font-medium transition-colors`}
              aria-disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
