interface SearchFormProps {
  defaultValue?: string;
}

export function SearchForm({ defaultValue }: SearchFormProps) {
  return (
    <div>
      <p>Search</p>
      {defaultValue && (
        <p>
          Searching for: <span className="font-semibold">{defaultValue}</span>
        </p>
      )}
      <form method="GET" action="/">
        <input
          type="text"
          name="search"
          defaultValue={defaultValue}
          placeholder="Search advocates..."
          style={{ border: "1px solid black" }}
        />
        <button type="submit">Search</button>
        {defaultValue && (
          <a href="/" style={{ marginLeft: "10px" }}>
            Reset Search
          </a>
        )}
      </form>
    </div>
  );
}