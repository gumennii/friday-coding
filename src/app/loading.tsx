import { TableSkeleton } from "@/components/table-skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search Section Skeleton */}
        <div className="mb-8">
          <div className="w-full">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-md w-24 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 bg-gray-200 rounded w-28 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <TableSkeleton />
          </div>
        </div>
        
        {/* Pagination Skeleton */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-8 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-8 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-8 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </main>
  );
}