interface AdvocateSearchProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export function AdvocateSearch({
  searchTerm,
  onChange,
  onReset,
}: AdvocateSearchProps) {
  return (
    <div>
      <p>Search</p>
      {searchTerm && (
        <p>
          Searching for: <span className="font-semibold">{searchTerm}</span>
        </p>
      )}
      <input
        type="text"
        value={searchTerm}
        style={{ border: "1px solid black" }}
        onChange={onChange}
        placeholder="Search advocates..."
      />
      <button onClick={onReset}>Reset Search</button>
    </div>
  );
}