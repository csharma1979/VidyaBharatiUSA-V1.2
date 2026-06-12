import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    donationId: {
      type: String,
      unique: true,
      sparse: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
    },
    stripeSessionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    stripePaymentIntentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    failureReason: {
      type: String,
      default: null,
    },
    isGuest: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: String,
      default: "",
    },
    ticketType: {
      type: String,
      default: "",
    },
    ticketStatus: {
      type: String,
      enum: ["Active", "Cancelled", "Refunded", "Checked-In"],
      default: "Active",
    },
    checkInStatus: {
      type: String,
      enum: ["Pending", "Checked-In"],
      default: "Pending",
    },
    seatNumber: {
      type: String,
      default: "",
    },
    tableNumber: {
      type: String,
      default: "",
    },
    zone: {
      type: String,
      default: "",
    },
    specialRequirements: {
      type: String,
      default: "",
    },
    seatingPreference: {
      type: String,
      default: "",
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
