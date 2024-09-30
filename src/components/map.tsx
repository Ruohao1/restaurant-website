"use client";

import { useEffect, useRef } from "react";

const Map: React.FC = () => {
  const mapRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      console.log("clicking map");
      mapRef.current.focus();
      mapRef.current.click();
    }
  }, []);

  return (
    <div className="m-5">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2617.626573047063!2d2.1403975773346384!3d48.99866347135141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6605cd63babbf%3A0x1156126e5ee6c63c!2sYamayoshi..!5e0!3m2!1sen!2sfr!4v1725649926549!5m2!1sen!2sfr"
        className="w-full h-72"
        loading="lazy"
        sandbox="allow-same-origin allow-scripts"
      ></iframe>
    </div>
  );
};

export default Map;
