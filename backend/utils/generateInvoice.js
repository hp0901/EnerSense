import PDFDocument from "pdfkit";
import axios from "axios";

export const generateInvoicePDF = async (invoiceData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      /* ========= FORMAT DATE ========= */
      const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      };

      /* ========= FETCH LOGO ========= */
      const logoResponse = await axios.get(
        "https://res.cloudinary.com/dbh7fzwcx/image/upload/v1771265387/EnerSence_logo_pcpgd6.png",
        { responseType: "arraybuffer" }
      );
      const logoBuffer = Buffer.from(logoResponse.data, "binary");

      /* ========= FETCH STAMP ========= */
      const stampResponse = await axios.get(
        "https://res.cloudinary.com/dbh7fzwcx/image/upload/v1774107882/1d397c7a-9299-4925-9289-6e40ffd3ef68_mfogut.png",
        { responseType: "arraybuffer" }
      );
      const stampBuffer = Buffer.from(stampResponse.data, "binary");

      /* ========= HEADER ========= */

      // Logo
      doc.image(logoBuffer, (doc.page.width - 120) / 2, 40, {
        width: 120,
      });

      doc.moveDown(6);

      doc
        .fontSize(10)
        .fillColor("#666")
        .text("Smart Energy. Smarter Living.", {
          align: "center",
        });

      doc.moveDown(2);

      // Invoice title
      doc
        .fontSize(20)
        .fillColor("#000")
        .text("INVOICE", 400, 50, { align: "right" });

      doc
        .fontSize(10)
        .fillColor("#555")
        .text(
          `Invoice No: ENS-${invoiceData.invoiceId.toString().slice(-6)}`,
          400,
          75,
          { align: "right" }
        )
        .text(`Date: ${formatDate(invoiceData.date)}`, {
          align: "right",
        });

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

      doc.roundedRect(50, tableTop, 500, 22, 5).fill("#f3f4f6");

      doc
        .fillColor("#000")
        .fontSize(11)
        .text("Description", 60, tableTop + 6)
        .text("Plan", 300, tableTop + 6)
        .text("Amount", 450, tableTop + 6);

      /* ========= TABLE ROW ========= */

      const rowTop = tableTop + 28;

      doc.fontSize(11).fillColor("#000");

      doc.text("EnerSense Premium Subscription", 60, rowTop);
      doc.text(invoiceData.plan.toUpperCase(), 300, rowTop);
      doc.text(`Rs ${invoiceData.amount}`, 450, rowTop);

      /* ========= TOTAL BOX ========= */

      const totalTop = rowTop + 45;

      doc.roundedRect(350, totalTop, 200, 45, 8).stroke("#4f46e5");

      doc
        .fontSize(12)
        .fillColor("#555")
        .text("TOTAL", 360, totalTop + 10);

      doc
        .fontSize(16)
        .fillColor("#000")
        .text(`Rs ${Number(invoiceData.amount)}`, 470, totalTop + 10);

      doc.moveDown(4);

      /* ========= PAYMENT INFO ========= */

      const paymentTop = doc.y;

      doc
        .fontSize(10)
        .fillColor("#555")
        .text(`Payment ID: ${invoiceData.paymentId}`, 50, paymentTop)
        .text(`Order ID: ${invoiceData.orderId}`, 50, paymentTop + 15);

      doc.moveDown(6);

      /* ========= STAMP ========= */

      /* ========= STAMP (ALIGN WITH PAYMENT INFO) ========= */

      // same Y level as payment info
      const stampWidth = 100;
      const stampX = doc.page.width - stampWidth - 60;
      const stampY = paymentTop - 10; // 👈 align with Payment ID

      doc.opacity(0.85);
      doc.image(stampBuffer, stampX, stampY, {
        width: stampWidth,
      });
      doc.opacity(1);
      /* ========= PRINTED ON (Below Stamp) ========= */

      // current date (download time)
      const currentDate = formatDate(new Date());

      // center below stamp
      doc
        .fontSize(9)
        .fillColor("#555")
        .text(`Printed On - ${currentDate}`, stampX, stampY + stampWidth + 5, {
          width: stampWidth,
          align: "center",
        });
      /* ========= FOOTER (FIXED CLICKABLE + CENTER) ========= */

      const centerX = 50;
      const pageWidth = doc.page.width - 100;

      // Store Y position properly
      const footerY = doc.y;

      doc
        .fontSize(11)
        .fillColor("#000")
        .text("Thank you for choosing EnerSense!", centerX, footerY, {
          width: pageWidth,
          align: "center",
        });

      // move slightly down manually (NOT doc.y + 5)
     /* ========= FOOTER EMAIL (PREMIUM LOOK) ========= */

        doc
          .fontSize(10)
          .fillColor("#666")
          .text("Need help? Contact us at ", centerX, footerY + 18, {
            width: pageWidth,
            align: "center",
          });

        doc
          .moveDown(0.2)
          .fontSize(11)
          .fillColor("#2563eb")
          .text("enersense01@gmail.com", {
            width: pageWidth,
            align: "center",
            link: "mailto:enersense01@gmail.com",
            underline: true,
          });
          // Finalize PDF file
            doc.end();
          } catch (error) {
            reject(error);
          }
        });
      };
