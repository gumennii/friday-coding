import { Advocate } from "@/types/advocate";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  if (advocates.length === 0) {
    return <p>No advocates found.</p>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "2px solid black" }}>
          <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
          <th style={{ textAlign: "left", padding: "10px" }}>City</th>
          <th style={{ textAlign: "left", padding: "10px" }}>Degree</th>
          <th style={{ textAlign: "left", padding: "10px" }}>Years of Experience</th>
          <th style={{ textAlign: "left", padding: "10px" }}>Phone Number</th>
          <th style={{ textAlign: "left", padding: "10px" }}>Specialties</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate) => (
          <tr key={advocate.id} style={{ borderBottom: "1px solid #ccc" }}>
            <td style={{ padding: "10px" }}>
              {advocate.firstName} {advocate.lastName}
            </td>
            <td style={{ padding: "10px" }}>{advocate.city}</td>
            <td style={{ padding: "10px" }}>{advocate.degree}</td>
            <td style={{ padding: "10px" }}>{advocate.yearsOfExperience}</td>
            <td style={{ padding: "10px" }}>{advocate.phoneNumber}</td>
            <td style={{ padding: "10px" }}>
              {advocate.specialties.join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}