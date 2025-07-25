import { Advocate } from "@/types/advocate";
import { AdvocateRow } from "./advocate-row";
import { LoadingSpinner } from "./loading-spinner";

interface AdvocateTableProps {
  advocates: Advocate[];
  loading: boolean;
  error: string | null;
}

export function AdvocateTable({
  advocates,
  loading,
  error,
}: AdvocateTableProps) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (advocates.length === 0) {
    return <p>No advocates found</p>;
  }

  return (
    <>
      <p className="mb-4">Found {advocates.length} advocates</p>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => (
            <AdvocateRow key={advocate.id} advocate={advocate} />
          ))}
        </tbody>
      </table>
    </>
  );
}