import mongoose, { Document, Schema } from "mongoose";
import { generateUniqueCode } from "../../utils/uuid";
import { thirtyDaysFromNow } from "../../config/date-time";

export interface VerificationCodeDocument extends Document {
  userId: string;
  code: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OtpSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const OTPModel = mongoose.model<VerificationCodeDocument>(
  "OTP",
  OtpSchema
);

export default OTPModel;
