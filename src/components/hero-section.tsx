interface HeroSectionProps {
  searchValue?: string;
  totalCount?: number;
}

export function HeroSection({ searchValue, totalCount }: HeroSectionProps) {
  return (
    <div 
      className="relative"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='1728' height='223' viewBox='0 0 1728 223' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1728 222.5C1109.63 173.762 319.044 199.551 0 218.538V0H1728V222.5Z' fill='%23F4F8F7'/%3E%3C/svg%3E"), linear-gradient(to bottom, white, #F4F8F7)`,
        backgroundPosition: '50% 100%, 0 0',
        backgroundSize: 'cover, auto',
        backgroundRepeat: 'no-repeat, repeat'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-mollie font-normal text-solace-gray-900 mb-6 leading-tight">
            Don&apos;t navigate your health alone.
          </h1>
          
          <p className="text-lg text-solace-gray-600 max-w-2xl mx-auto mb-8">
            Find an advocate who will help untangle your healthcare by phone or video—no matter what you need—covered by Medicare.
          </p>
          
          {/* Search Form */}
          <div className="max-w-2xl mx-auto">
            {searchValue && (
              <p className="text-center text-solace-gray-600 mb-4">
                Found {totalCount} {totalCount === 1 ? 'advocate' : 'advocates'} matching <span className="font-medium text-solace-gray-900">&ldquo;{searchValue}&rdquo;</span>
              </p>
            )}
            
            <form method="GET" action="/" className="w-full" id="search">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  name="search"
                  defaultValue={searchValue}
                  placeholder="Search by name, city, or specialty..."
                  className="flex-1 px-4 py-3 text-solace-gray-900 placeholder-solace-gray-500 bg-white border border-solace-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solace-green focus:border-transparent transition-all duration-200 shadow-sm"
                  aria-label="Search advocates"
                />
                
                <button 
                  type="submit"
                  className="btn-green whitespace-nowrap"
                >
                  Search Advocates
                </button>
                
                {searchValue && (
                  <a 
                    href="/" 
                    className="btn-secondary whitespace-nowrap"
                  >
                    Clear
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}