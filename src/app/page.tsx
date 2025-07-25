"use client";

import { AdvocateSearch } from "@/components/advocate-search";
import { AdvocateTable } from "@/components/advocate-table";
import { useAdvocates } from "@/hooks/use-advocates";

export default function Home() {
  const { filteredAdvocates, loading, error, searchTerm, onChange, onReset } =
    useAdvocates();

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <AdvocateSearch
        searchTerm={searchTerm}
        onChange={onChange}
        onReset={onReset}
      />
      <br />
      <br />
      <AdvocateTable
        advocates={filteredAdvocates}
        loading={loading}
        error={error}
      />
    </main>
  );
}
