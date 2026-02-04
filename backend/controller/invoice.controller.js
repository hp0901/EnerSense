import Payment from "../models/Payment.js";
import { generateInvoicePDF } from "../utils/generateInvoice.js";

export const downloadInvoice = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;

    const payment = await Payment.findById(paymentId)
      .populate("user", "firstName email");

    if (!payment) {
      return res.status(404).json({ success: false });
    }

    const pdfBuffer = await generateInvoicePDF({
      invoiceId: payment._id,
      name: payment.user.firstName,
      email: payment.user.email,
      plan: payment.plan,
      amount: payment.amount,
      paymentId: payment.razorpayPaymentId,
      orderId: payment.razorpayOrderId,
      date: payment.paidAt.toDateString(),
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=EnerSense-Invoice.pdf"
    );

    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
