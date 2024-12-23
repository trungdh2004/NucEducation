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

const VerificationSchema = new Schema(
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
      default: generateUniqueCode,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const VerificationModel = mongoose.model<VerificationCodeDocument>(
  "Verification",
  VerificationSchema
);

export default VerificationModel;
