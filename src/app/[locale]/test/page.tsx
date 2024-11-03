"use client";

import { useEffect, useState } from "react";

function TestLocalStorage() {
  const [data, setData] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("testData");
    if (storedData) {
      setData(storedData);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("testData", "Hello World!");
    setData("Hello World!");
  };

  return (
    <div>
      <p>Stored Data: {data}</p>
      <button onClick={handleSave}>Save to Local Storage</button>
    </div>
  );
}

export default TestLocalStorage;
