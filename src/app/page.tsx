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
    <div className="min-h-screen bg-white">
      {/* Hero section with integrated search */}
      <HeroSection searchValue={search} totalCount={totalCount} />
      
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Results Section */}
        <div id="results" className="mb-8">
          {advocatesList.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-mollie font-normal text-solace-gray-900">
                {search ? 'Search Results' : 'Featured Healthcare Advocates'}
              </h2>
            </div>
          )}
          
          {/* Advocates Grid */}
          <AdvocatesTable advocates={advocatesList} />
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages}
              search={search}
            />
          </div>
        )}
        
      </div>
    </main>
    </div>
  );
}
