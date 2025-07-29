export function TableSkeleton() {
  return (
    <div className="animate-pulse">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-28"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-6 bg-gray-200 rounded-full w-12"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-8"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-24"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}