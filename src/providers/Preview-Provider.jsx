"use client";

import { createContext, useState, useContext } from "react";

const PreviewContext = createContext();

export const PreviewProvider = ({ children }) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  return (
    <PreviewContext.Provider value={{ previewSrc, setPreviewSrc }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    return new Error("No Preview Context!");
  }
  return context;
};
