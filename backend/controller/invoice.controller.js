import Payment from "../models/Payment.js";
import { generateInvoicePDF } from "../utils/generateInvoice.js";

export const downloadInvoice = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;

    const payment = await Payment.findById(paymentId)
      .populate("user", "firstName lastName email");

    if (!payment) {
      return res.status(404).json({ success: false });
    }

    const pdfBuffer = await generateInvoicePDF({
      invoiceId: payment._id,
      firstname: payment.user.firstName,
      lastname: payment.user.lastName,
      email: payment.user.email,
      plan: payment.plan,
      amount: payment.amount,
      paymentId: payment.razorpayPaymentId,
      orderId: payment.razorpayOrderId,
      date: new Date(payment.paidAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=EnerSense-Invoice.pdf"
    );

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};
