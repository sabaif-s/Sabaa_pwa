import React, { useState, useEffect } from "react";

const AssetPdf = () => {
  const [assetPdf, setAssetPdf] = useState([]); // Successfully loaded PDFs
  const [failedPdf, setFailedPdf] = useState([]); // Track failed imports
  const [error, setError] = useState(null); // General error (if needed)

  const assetPdfS = [
    {
      src: () => import("../../assets/pdfAsset/firstPdf.pdf"),
      uniqueID: "firstPdf",
      topic: "Relation",
    },
    {
      src: () => import("../../assets/pdfAsset/ThirdPdf.pdf"),
      uniqueID: "secondPdf",
      topic: "Function",
    },
  ];

  // Function to dynamically load PDFs
  const loadPdf = async (pdfData) => {
    const results = await Promise.all(
      pdfData.map(async (item) => {
        try {
          // Try to import the PDF dynamically
          const pdfModule = await item.src();
          return {
            src: pdfModule.default,
            uniqueID: item.uniqueID,
            topic: item.topic,
          };
        } catch (err) {
          console.error(`Failed to load PDF (${item.uniqueID}):`, err);
          return {
            uniqueID: item.uniqueID,
            topic: item.topic,
            error: "Failed to load PDF. Check your network connection.",
          };
        }
      })
    );
    return results;
  };

  useEffect(() => {
    const fetchPdfS= async () => {
      try {
        const loadedPdf = await loadPdf(assetPdfS);

        // Separate successful and failed results
        const successfulPdf = loadedPdf.filter((pdf) => !pdf.error);
        const failedPdf = loadedPdf.filter((pdf) => pdf.error);

        // Update state
        setAssetPdf(successfulPdf);
        setFailedPdf(failedPdf);
      } catch (err) {
        setError("An error occurred while loading PDFs.");
        console.error(err);
      }
    };

    fetchPdfS();
  }, []);

  return {failedPdf,assetPdf}
};

export default AssetPdf;


 