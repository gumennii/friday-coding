import { useEffect, useState } from "react";
import { Advocate } from "@/types/advocate";

export function useAdvocates() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/advocates");
        if (!response.ok) {
          throw new Error("Failed to fetch advocates");
        }
        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredAdvocates(advocates);
      return;
    }

    const searchLower = value.toLowerCase();
    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchLower) ||
        advocate.lastName.toLowerCase().includes(searchLower) ||
        advocate.city.toLowerCase().includes(searchLower) ||
        advocate.degree.toLowerCase().includes(searchLower) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchLower)
        ) ||
        advocate.yearsOfExperience.toString().includes(value)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const onReset = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return {
    filteredAdvocates,
    loading,
    error,
    searchTerm,
    onChange,
    onReset,
  };
}