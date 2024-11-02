import html2pdf from "html2pdf.js";

export const downloadPDF = (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  const options = {
    margin: 0.5,
    filename: filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
};
