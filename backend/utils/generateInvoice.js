import PDFDocument from "pdfkit";
import axios from "axios";

export const generateInvoicePDF = async (invoiceData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      /* ========= FETCH LOGO ========= */

      const logoResponse = await axios.get(
        "https://res.cloudinary.com/dbh7fzwcx/image/upload/v1771265387/EnerSence_logo_pcpgd6.png",
        { responseType: "arraybuffer" }
      );

      const logoBuffer = Buffer.from(logoResponse.data, "binary");

      /* ========= HEADER ========= */

      // Logo (centered)
      doc.image(
        logoBuffer,
        (doc.page.width - 120) / 2, // center horizontally
        40,
        { width: 120 }
      );

      // Move cursor below logo
      doc.moveDown(6);

      // Company Name (centered)
      doc
        .fontSize(18)
        .fillColor("#000")
        .text("", {
          align: "center",
        });

      // Tagline
      doc
        .fontSize(10)
        .fillColor("#666")
        .text("Smart Energy. Smarter Living.", {
          align: "center",
        });

      doc.moveDown(2);

      // Invoice title (right)
      doc
        .fontSize(20)
        .fillColor("#000")
        .text("INVOICE", 400, 50, { align: "right" });

      doc
        .fontSize(10)
        .fillColor("#555")
        .text(
          `Invoice No: ENS-${invoiceData.invoiceId
            .toString()
            .slice(-6)}`,
          400,
          75,
          { align: "right" }
        )
        .text(`Date: ${invoiceData.date}`, { align: "right" });

      doc.moveDown(5);

      /* ========= BILL TO ========= */

      const billTop = doc.y;

      doc
        .fontSize(11)
        .fillColor("#888")
        .text("BILLED TO", 50, billTop);

      doc
        .fontSize(12)
        .fillColor("#000")
        .text(
          `${invoiceData.firstname} ${invoiceData.lastname || ""}`,
          50,
          billTop + 15
        )
        .text(invoiceData.email, 50, billTop + 35);

      doc.moveDown(3);

      /* ========= TABLE HEADER ========= */

      const tableTop = doc.y;

      doc.rect(50, tableTop, 500, 20).fill("#f3f4f6");

      doc
        .fillColor("#000")
        .fontSize(11)
        .text("Description", 60, tableTop + 5)
        .text("Plan", 300, tableTop + 5)
        .text("Amount", 450, tableTop + 5);

      /* ========= TABLE ROW ========= */

      const rowTop = tableTop + 25;

      doc
        .fontSize(11)
        .fillColor("#000");

      doc.text("EnerSense Premium Subscription", 60, rowTop);
      doc.text(invoiceData.plan, 300, rowTop);
      doc.text(`₹${invoiceData.amount}`, 450, rowTop);

      /* ========= TOTAL BOX ========= */

     /* ========= TOTAL BOX ========= */

const totalTop = rowTop + 40;

doc.rect(350, totalTop, 200, 40).stroke();

doc
  .fontSize(12)
  .fillColor("#000")
  .text("TOTAL", 360, totalTop + 12);

doc
  .fontSize(14)
  .fillColor("#000")
  .text(`₹${Number(invoiceData.amount)}`, 470, totalTop + 12);



      doc.moveDown(4);

      /* ========= PAYMENT INFO ========= */

      const paymentTop = doc.y;

      doc
        .fontSize(10)
        .fillColor("#555")
        .text(`Payment ID: ${invoiceData.paymentId}`, 50, paymentTop)
        .text(`Order ID: ${invoiceData.orderId}`, 50, paymentTop + 15);

      doc.moveDown(6);

      /* ========= FOOTER ========= */

      doc
        .fontSize(11)
        .fillColor("#000")
        .text("Thank you for choosing EnerSense!", {
          align: "center",
        });

      doc
        .fontSize(10)
        .fillColor("#777")
        .text("For support: enersense01@gmail.com", {
          align: "center",
        });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
