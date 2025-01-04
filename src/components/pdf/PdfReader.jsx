import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import ScreenSize from "../../hooks/ScreenSize";

// Configure PDF.js worker

const PDFViewer = ({ pdfBlob, handlingBack }) => {
  const containerRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [renderingPage, setRenderingPage] = useState(false);
  const {isMobile}=ScreenSize();

  useEffect(() => {
    const loadPDF = async () => {
      if (!pdfBlob) {
        console.error("No PDF Blob provided.");
        return;
      }

      const pdfUrl = URL.createObjectURL(pdfBlob);

      try {
        setLoading(true);

        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl, // 64 KB chunks
        });
        const pdfDoc = await loadingTask.promise;
        const pageFirst = await pdfDoc.getPage(1);
        const viewport = pageFirst.getViewport({ scale: 1.0 });

        console.log(`Width: ${viewport.width}, Height: ${viewport.height}`);
        console.log(pageFirst);
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
        console.log(pdfDoc);
        console.log(loadingTask);
        console.log(pdfDoc.numPages);

        // Render the first page
        renderPage(pdfDoc, 1);
      } catch (error) {
        console.error("Error loading PDF:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML =
            '<p className="text-red-500 text-center">Failed to load PDF. Please try again.</p>';
        }
      } finally {
        setLoading(false);
        URL.revokeObjectURL(pdfUrl); // Revoke the blob URL to release memory
      }
    };

    loadPDF();
  }, [pdfBlob]);

  const renderPage = async (pdfDoc, pageNum) => {
    if (!pdfDoc || renderingPage) return;

    try {
      setRenderingPage(true);

      const page = await pdfDoc.getPage(pageNum);
      console.log("page dimension:", page.getViewport({ scale: 1 }));
      const { width, height } = page.getViewport({ scale: 1 });
      let ratio;
      let high;
      if (height > width) {
        high = "height";
        ratio = height / width;
      } else {
        high = "width";
        ratio = width / height;
      }
      const scale = calculateScale(ratio, high); // Dynamic scaling based on container size
      const viewport = page.getViewport({ scale });
      console.log("scale:", scale);
      console.log("view port:", viewport);
      const canvas = document.createElement("canvas");
      containerRef.current.innerHTML = ""; // Clear the container before rendering
      containerRef.current.appendChild(canvas);
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      // Render the page content
      await page.render(renderContext).promise;
    } catch (error) {
      console.error(`Error rendering page ${pageNum}:`, error);
        
    } finally {
      setRenderingPage(false);
    }
  };

  const calculateScale = (ratio, high) => {
    if (containerRef.current != null) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      console.log(containerHeight, containerWidth);
      console.log(window.innerWidth);
      const isMobile = window.innerWidth < 500 ? true : false;
      console.log(isMobile);
      const pageAspectRatio = ratio; // Adjust aspect ratio based on PDF content
      if (high == "width") {
        return Math.min(
          containerWidth / (pageAspectRatio * 600),
          containerHeight / 900
        );
      } else if (high == "height" && isMobile) {
        return Math.min(1, containerWidth / (pageAspectRatio * 360), containerHeight / (pageAspectRatio * 300));
      } else if (high == "height" && !isMobile) {
        return Math.min(
          1,
          containerWidth / (pageAspectRatio * 300),
          containerHeight / 600
        );
      } else {
        return Math.min(
          containerWidth / (pageAspectRatio * 900),
          containerHeight / 600
        );
      }
    }
  };

  const goToNextPage = async () => {
    if (pageNumber < numPages && !renderingPage) {
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
      await renderPage(pdf, nextPage);
    }
  };

  const goToPreviousPage = async () => {
    if (pageNumber > 1 && !renderingPage) {
      const previousPage = pageNumber - 1;
      setPageNumber(previousPage);
      await renderPage(pdf, previousPage);
    }
  };

  const backHandling = () => {
    handlingBack();
  };

  return (
    <div className={`relative z-30 w-full h-full bg-gray-50 flex flex-col items-center justify-center overflow-auto border border-gray-300 rounded-md shadow-lg ${isMobile ? "p-2":"p-4"} `}>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="text-xl text-gray-600">Loading PDF...</span>
        </div>
      ) : (
        <>
        <div className={`w-full h-full ${isMobile ? "p-0":"p-4"} bg-red-100`} >

        
          <div
            ref={containerRef}
            id="pdf-container"
            className="relative w-full h-full flex items-center justify-center overflow-auto"
            style={{ maxHeight: "100vh" }}
          ></div>
          </div>
        </>
      )}
      <div className="flex flex-wrap gap-y-4 justify-between w-full mt-4">
        <button
          onClick={goToPreviousPage}
          className="basis-1/3 text-white rounded-md"
          disabled={pageNumber === 1 || renderingPage}
        >
          <span className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600">
            Previous
          </span>
        </button>
        <span className="text-center basis-1/3 text-lg">
          Page {pageNumber} of {numPages}
        </span>
        <button
          onClick={goToNextPage}
          className="basis-1/3 text-white rounded-md"
          disabled={pageNumber === numPages || renderingPage}
        >
          <span className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600">
            Next
          </span>
        </button>
        <button
          onClick={backHandling}
          className="basis-2/3 flex justify-end"
        >
          <span className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600">
            Back
          </span>
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;