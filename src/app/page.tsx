import { SearchForm } from "@/components/search-form";
import { AdvocatesTable } from "@/components/advocates-table";
import { Pagination } from "@/components/pagination";
import { getAdvocates } from "@/lib/advocates";

interface PageProps {
  searchParams: Promise<{ 
    search?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const currentPage = parseInt(params.page || "1");
  const pageSize = 10;
  
  // Get data from database
  const { advocates, totalCount } = await getAdvocates({
    search,
    page: currentPage,
    pageSize
  });
  
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <SearchForm defaultValue={search} />
      <br />
      <br />
      <AdvocatesTable advocates={advocates} />
      <br />
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages}
          search={search}
        />
      )}
    </main>
  );
}
