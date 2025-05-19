import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface UseHandleDownloadPDFProps {
  ticketRef: React.RefObject<HTMLDivElement>;
}

function useHandleDownloadPDF({ ticketRef }: UseHandleDownloadPDFProps) {
  const handleDownloadPDF = async () => {
    if (!ticketRef.current) return;

    try {
      const dataUrl = await toPng(ticketRef.current, {
        cacheBust: true,
        pixelRatio: 3, // tăng độ nét
        backgroundColor: "black",
      });

      const img = new window.Image();
      img.src = dataUrl;

      img.onload = () => {
        const pdfWidth = 595.28; // A4 width in pt
        const pdfHeight = 841.89; // A4 height in pt
        const margin = 20;

        // Tính chiều cao hình ảnh theo tỷ lệ phù hợp
        const imgProps = {
          width: pdfWidth - margin * 2,
          height: (img.height * (pdfWidth - margin * 2)) / img.width,
        };

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: [pdfWidth, pdfHeight],
        });

        // Nếu hình cao hơn A4 thì scale nhỏ lại
        const finalHeight =
          imgProps.height > pdfHeight - margin * 2 ? pdfHeight - margin * 2 : imgProps.height;

        const finalWidth = (finalHeight * img.width) / img.height;

        const x = (pdfWidth - finalWidth) / 2;
        const y = margin;

        pdf.addImage(dataUrl, "PNG", x, y, finalWidth, finalHeight);
        pdf.save("ticket.pdf");
      };
    } catch (error) {
      console.error("Lỗi khi xuất PDF:", error);
    }
  };
  return { handleDownloadPDF };
}

export default useHandleDownloadPDF;
