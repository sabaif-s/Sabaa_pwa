import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = ({ pdfBlob }) => {
  const containerRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const renderPDF = async () => {
      if (!pdfBlob) {
        console.error("No PDF Blob or container reference.");
        return;
      }

      // Create an object URL for the blob
      const pdfUrl = URL.createObjectURL(pdfBlob);
      console.log("PDF URL created:", pdfUrl);

      try {
        setLoading(true);

        // Load the PDF from the blob URL
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
        console.log("PDF loaded successfully:", pdfDoc);

        // Render the first page
        renderPage(pdfDoc, 1);
      } catch (error) {
        console.error("Error rendering PDF:", error);
        containerRef.current.innerHTML =
          '<p class="text-red-500 text-center">Failed to load PDF. Please try again.</p>';
      } finally {
        setLoading(false);
        // Revoke the object URL to release memory
        URL.revokeObjectURL(pdfUrl);
      }
    };

    renderPDF();
  }, [pdfBlob]);

  const renderPage = async (pdfDoc, pageNum) => {
    if (!pdfDoc) return;

    try {
      const page = await pdfDoc.getPage(pageNum);
      const scale = calculateScale(); // Use dynamic scale based on container size
      const viewport = page.getViewport( scale );

      // Create a canvas for rendering
      const canvas = document.createElement("canvas");
      containerRef.current.innerHTML = ""; // Clear the container before adding canvas
      containerRef.current.appendChild(canvas);

      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      await page.render(renderContext).promise;
      console.log(`Page ${pageNum} rendered successfully.`);
    } catch (error) {
      console.error(`Error rendering page ${pageNum}:`, error);
    }
  };

  // Calculate the scale based on the container size
  const calculateScale = () => {
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    const pageAspectRatio = 1; // Aspect ratio of your PDF (adjust as needed)

    const scale = Math.min(containerWidth / (pageAspectRatio * 600), containerHeight / 900);
    console.log("scale:",scale);
    return scale > 1 ? {scale:1} : {scale:0.4}; // Limit max scale to 1
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      renderPage(pdf, pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      renderPage(pdf, pageNumber - 1);
    }
  };

  return (
    <div className="relative z-30 w-full h-full bg-gray-50 flex flex-col items-center justify-center overflow-auto border border-gray-300 rounded-md shadow-lg p-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="text-xl text-gray-600">Loading PDF...</span>
        </div>
      ) : (
        <>
          <div
            ref={containerRef}
            id="pdf-container"
            className="relative w-full flex items-center justify-center overflow-auto"
            style={{ maxHeight: "80vh" }} // Optional: Set max height to make it scrollable
          ></div>
          <div className="flex justify-between w-full mt-4">
            <button
              onClick={goToPreviousPage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={pageNumber === 1}
            >
              Previous
            </button>
            <span className="text-center text-lg">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={goToNextPage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={pageNumber === numPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PDFViewer;
