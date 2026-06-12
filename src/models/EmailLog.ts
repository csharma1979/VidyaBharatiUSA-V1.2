import mongoose from "mongoose";

const EmailLogSchema = new mongoose.Schema(
  {
    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    error: {
      type: String,
      default: null,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    isManual: {
      type: Boolean,
      default: false,
    },
    recipientDetails: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "donation_confirmation",
    },
  },
  { timestamps: true }
);

export default mongoose.models.EmailLog || mongoose.model("EmailLog", EmailLogSchema);
