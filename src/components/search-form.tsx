interface SearchFormProps {
  defaultValue?: string;
}

export function SearchForm({ defaultValue }: SearchFormProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Search Advocates</h2>
          {defaultValue && (
            <p className="text-sm text-gray-600">
              Results for: <span className="font-medium text-gray-900">{defaultValue}</span>
            </p>
          )}
        </div>
        
        <form method="GET" action="/" className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              name="search"
              defaultValue={defaultValue}
              placeholder="Search by name, city, or specialty..."
              className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              aria-label="Search advocates"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Search
            </button>
            
            {defaultValue && (
              <a 
                href="/" 
                className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors inline-flex items-center"
              >
                Clear
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}