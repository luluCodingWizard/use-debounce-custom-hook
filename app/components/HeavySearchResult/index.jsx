import React, { useState, useEffect } from "react";

// Simulated data set
const largeDataSet = Array(10000)
  .fill(null)
  .map((_, index) => `item ${index}`);

// Function to mimic heavy computation with a delay
function heavySearchOperation(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = [];
      if (input.length > 0) {
        for (let i = 0; i < largeDataSet.length; i++) {
          // Simulate heavy computation by adding additional loops
          for (let j = 0; j < 1000; j++) {}
          if (largeDataSet[i].toLowerCase().includes(input.toLowerCase())) {
            results.push(largeDataSet[i]);
          }
        }
      }
      resolve(results);
    }, 2000); // Simulate a delay of 2 seconds
  });
}
const Index = ({ input }) => {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);

  // Perform search operation when input changes
  useEffect(() => {
    setSearching(true);
    heavySearchOperation(input).then((res) => {
      setResults(res);
      setSearching(false);
    });
  }, [input]);
  return (
    <div>
      <p>{searching ? "Searching..." : `Showing results for: ${input}`}</p>
      <ul>
        {results &&
          results.length > 0 &&
          results.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
};

export default Index;
