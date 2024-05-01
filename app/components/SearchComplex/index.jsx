import "@/styles/global.css";
import React, { useState, useEffect } from "react";
import mockFetch from "../../../lib/mockFetch";
import useDebounce from "../../hooks/useDebounce";

const Index = () => {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const debouncedQuery1 = useDebounce(query1, 500);
  const debouncedQuery2 = useDebounce(query2, 500);
  const [results, setResults] = useState([]);

  // Function to handle search whenever input changes
  const handleSearch = async (query) => {
    const result = await mockFetch(query);
    setResults(result);
  };

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery1) {
      handleSearch(debouncedQuery1);
    }
  }, [debouncedQuery1]);

  useEffect(() => {
    if (debouncedQuery2) {
      handleSearch(debouncedQuery2);
    }
  }, [debouncedQuery2]);

  return (
    <div>
      <input
        type="text"
        value={query1}
        onChange={(e) => setQuery1(e.target.value)}
        placeholder="Search query 1..."
        className=" placeholder-black bg-gray-400 border-1 border-black"
      />
      <br />
      <br />
      <input
        type="text"
        value={query2}
        onChange={(e) => setQuery2(e.target.value)}
        placeholder="Search query 2..."
        className="placeholder-black bg-gray-400 border-1 border-black"
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
