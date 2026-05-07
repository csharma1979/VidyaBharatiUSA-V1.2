import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
  {
    stripePublicKey: {
      type: String,
      required: true,
    },
    stripeSecretKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
