import { SearchForm } from "@/components/search-form";
import { AdvocatesTable } from "@/components/advocates-table";
import { Pagination } from "@/components/pagination";
import { HeroSection } from "@/components/hero-section";
import { getAdvocates } from "@/lib/advocates";
import { PAGINATION } from "@/lib/constants";

interface PageProps {
  searchParams: Promise<{ 
    search?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const currentPage = parseInt(params.page || PAGINATION.DEFAULT_PAGE.toString());
  const pageSize = PAGINATION.DEFAULT_PAGE_SIZE;
  
  // Get paginated data
  const { advocates: advocatesList, totalCount } = await getAdvocates({
    search,
    page: currentPage,
    pageSize
  });
  
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      {!search && <HeroSection />}
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Search Section */}
        <div className="mb-8">
          <SearchForm defaultValue={search} />
        </div>
        
        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-900">
                {search ? 'Search Results' : 'All Advocates'}
              </h2>
              <span className="text-sm text-gray-500">
                {totalCount} {totalCount === 1 ? 'advocate' : 'advocates'} found
              </span>
            </div>
            <AdvocatesTable advocates={advocatesList} />
          </div>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages}
              search={search}
            />
          </div>
        )}
      </div>
    </main>
    </>
  );
}
