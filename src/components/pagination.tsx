import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  search: string;
}

export function Pagination({ currentPage, totalPages, search }: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      {currentPage > 1 && (
        <Link href={createPageUrl(currentPage - 1)}>
          Previous
        </Link>
      )}
      
      <span>Page {currentPage} of {totalPages}</span>
      
      {currentPage < totalPages && (
        <Link href={createPageUrl(currentPage + 1)}>
          Next
        </Link>
      )}
    </div>
  );
}