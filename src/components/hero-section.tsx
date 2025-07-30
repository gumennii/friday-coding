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
        backgroundPosition: "50% 100%, 0 0",
        backgroundSize: "cover, auto",
        backgroundRepeat: "no-repeat, repeat",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-mollie text-4xl font-normal leading-tight text-solace-gray-900 sm:text-6xl">
            Don&apos;t navigate your health alone.
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-solace-gray-600">
            Find an advocate who will help untangle your healthcare by phone or
            video—no matter what you need—covered by Medicare.
          </p>

          {/* Search Form */}
          <div className="mx-auto max-w-2xl">
            {searchValue && (
              <p className="mb-4 text-center text-solace-gray-600">
                Found {totalCount} {totalCount === 1 ? "advocate" : "advocates"}{" "}
                matching{" "}
                <span className="font-medium text-solace-gray-900">
                  &ldquo;{searchValue}&rdquo;
                </span>
              </p>
            )}

            <form method="GET" action="/" className="w-full" id="search">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  name="search"
                  defaultValue={searchValue}
                  placeholder="Search by name, city, or specialty..."
                  className="flex-1 rounded-md border border-solace-gray-300 bg-white px-4 py-3 text-solace-gray-900 placeholder-solace-gray-500 shadow-sm transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-solace-green"
                  aria-label="Search advocates"
                />

                <button type="submit" className="btn-green whitespace-nowrap">
                  Search Advocates
                </button>

                {searchValue && (
                  <a href="/" className="btn-secondary whitespace-nowrap">
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
