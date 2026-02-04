import PDFDocument from "pdfkit";

export const generateInvoicePDF = (invoiceData) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    /* ===== HEADER ===== */
    doc
      .fontSize(22)
      .text("EnerSense Invoice", { align: "center" })
      .moveDown();

    doc.fontSize(12);
    doc.text(`Invoice Date: ${invoiceData.date}`);
    doc.text(`Invoice No: ${invoiceData.invoiceId}`);
    doc.moveDown();

    /* ===== CUSTOMER ===== */
    doc.fontSize(14).text("Billed To:");
    doc.fontSize(12);
    doc.text(`Name: ${invoiceData.name}`);
    doc.text(`Email: ${invoiceData.email}`);
    doc.moveDown();

    /* ===== PLAN DETAILS ===== */
    doc.fontSize(14).text("Subscription Details:");
    doc.fontSize(12);
    doc.text(`Plan: ${invoiceData.plan}`);
    doc.text(`Amount Paid: ₹${invoiceData.amount}`);
    doc.text(`Payment ID: ${invoiceData.paymentId}`);
    doc.text(`Order ID: ${invoiceData.orderId}`);
    doc.moveDown();

    /* ===== FOOTER ===== */
    doc
      .fontSize(12)
      .text("Thank you for choosing EnerSense 💚")
      .moveDown();
    doc.text("Smart Energy. Smarter Living.");

    doc.end();
  });
};
