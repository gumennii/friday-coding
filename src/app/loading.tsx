import { TableSkeleton } from "@/components/table-skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Search Section Skeleton */}
        <div className="mb-8">
          <div className="w-full">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-5 w-32 animate-pulse rounded bg-gray-200"></div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <div className="h-10 animate-pulse rounded-md bg-gray-200"></div>
                </div>
                <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section Skeleton */}
        <div className="mb-6 rounded-lg bg-white shadow-sm">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="h-5 w-28 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
            </div>
            <TableSkeleton />
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-20 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 w-8 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 w-8 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 w-8 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 w-20 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
