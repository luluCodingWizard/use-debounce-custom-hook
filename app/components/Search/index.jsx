import "@/styles/global.css";
import React, { useState, useEffect } from "react";
import mockFetch from "../../../lib/mockFetch";
import useDebounce from "../../hooks/useDebounce";

const Index = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery) {
        mockFetch(debouncedQuery).then(setResults);
      } else {
        setResults([]); // clear results if query is empty
      }
    };
    fetchResults();
  }, [debouncedQuery]);

  return (
    <div>
      <input
        type="text"
        className=" border-2 text-white border-gray-500 bg-slate-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search with debounce..."
      />
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
