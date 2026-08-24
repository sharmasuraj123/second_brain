export function SearchBar({ query, setQuery, resultsCount, totalCount }) {
  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
        <svg
          className="w-4 h-4 text-gray-400 mr-2 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your brain..."
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            ✕
          </button>
        )}
      </div>

      {query && (
        <p className="text-xs text-gray-400 mt-1 ml-1">
          {resultsCount === 0
            ? "No results found"
            : `${resultsCount} of ${totalCount} cards match`}
        </p>
      )}
    </div>
  );
}
