import "@/styles/global.css";
import React, { useState, useDeferredValue, useEffect } from "react";
import HeavySearchResult from "../HeavySearchResult";

const Index = () => {
  const [input, setInput] = useState("");
  const defferedInput = useDeferredValue(input);
  function handleChange(event) {
    setInput(event.target.value);
  }

  useEffect(() => {
    console.log("--- start useEffect()");
    console.log("input: " + input);
    console.log("defferedInput: " + defferedInput);
    console.log("-----------------------------------------> end");
  }, [input]);

  return (
    <div>
      <input
        className=" border-2 border-gray-400 bg-slate-300"
        placeholder="Type to search..."
        type="text"
        value={input}
        onChange={handleChange}
      />
      <p>{input && !defferedInput ? "Updating UI in real-time..." : null}</p>
      <HeavySearchResult input={defferedInput} />
    </div>
  );
};

export default Index;
