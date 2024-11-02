// utils/downloadPDF.ts
export const downloadPDF = async (elementId: string, filename: string): Promise<void> => {
  // Ensure this code only runs in the browser
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const { default: html2pdf } = await import("html2pdf.js"); 

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found.`);
    return;
  }

  const options = {
    margin: 0.5,
    filename: filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
};
