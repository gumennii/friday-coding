export function TableSkeleton() {
  return (
    <div className="animate-pulse">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">
              <div className="h-4 w-20 rounded bg-gray-200"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 w-16 rounded bg-gray-200"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 w-20 rounded bg-gray-200"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 w-32 rounded bg-gray-200"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 w-28 rounded bg-gray-200"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 w-24 rounded bg-gray-200"></div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {Array.from({ length: 10 }).map((_, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="whitespace-nowrap px-6 py-4">
                <div className="h-4 w-32 rounded bg-gray-200"></div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="h-4 w-24 rounded bg-gray-200"></div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="h-6 w-12 rounded-full bg-gray-200"></div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="h-4 w-8 rounded bg-gray-200"></div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="h-4 w-28 rounded bg-gray-200"></div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  <div className="h-5 w-20 rounded-full bg-gray-200"></div>
                  <div className="h-5 w-24 rounded-full bg-gray-200"></div>
                  <div className="h-5 w-16 rounded-full bg-gray-200"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
