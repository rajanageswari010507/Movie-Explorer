function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button type="submit">
        🔍 Search
      </button>
    </form>
  );
}

export default SearchBar;