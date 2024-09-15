"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { fallbackLng } from "./i18n/settings";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    // Check if the document is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      // Otherwise, wait for the load event
      window.addEventListener("load", handleLoad);
    }

    // Clean up event listener
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isLoaded) {
    return (
      <div style={styles.loadingContainer}>
        <h1>Loading...</h1>{" "}
        {/* You can replace this with a spinner or any loading animation */}
      </div>
    );
  }

  const lng: string = fallbackLng;

  return redirect(`/${lng}`);
}

const styles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height
    backgroundColor: "#f0f0f0", // Loading screen background color
  },
};
