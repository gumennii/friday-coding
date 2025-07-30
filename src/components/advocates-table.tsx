import { Advocate } from "@/types/advocate";
import { formatPhoneNumber, truncateText } from "@/lib/utils";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  if (advocates.length === 0) {
    return (
      <div className="px-4 py-16 text-center">
        <div className="mx-auto mb-6 h-32 w-32 text-solace-gray-300">
          <svg
            className="h-full w-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="font-mollie text-2xl font-normal text-solace-gray-900">
          No advocates found
        </h3>
        <p className="mx-auto mt-3 max-w-md text-base text-solace-gray-600">
          We couldn&apos;t find any advocates matching your search criteria. Try
          adjusting your search or explore all available advocates.
        </p>
        <div className="mt-8">
          <a href="/" className="btn-primary inline-flex items-center">
            View All Advocates
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-solace-gray-200 bg-solace-gray-50">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-solace-gray-700"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-solace-gray-700"
            >
              City
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-solace-gray-700"
            >
              Degree
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-solace-gray-700"
            >
              Experience
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-solace-gray-700"
            >
              Phone
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-solace-gray-700"
            >
              Specialties
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-solace-gray-200 bg-white">
          {advocates.map((advocate) => (
            <tr
              key={advocate.id}
              className="transition-colors hover:bg-solace-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm font-medium text-solace-gray-900">
                  {advocate.firstName} {advocate.lastName}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-solace-gray-700">
                  {advocate.city}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-solace-gold-light px-2.5 py-0.5 text-xs font-medium text-solace-gray-800">
                  {advocate.degree}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-solace-gray-700">
                  {advocate.yearsOfExperience} years
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-solace-gray-700">
                  {formatPhoneNumber(advocate.phoneNumber)}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-solace-gray-700">
                <div className="flex flex-wrap gap-1">
                  {advocate.specialties.map((specialty, idx) => (
                    <span key={idx} className="text-xs">
                      {specialty}
                      {idx < advocate.specialties.length - 1 ? "," : ""}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
