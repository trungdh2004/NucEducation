import mongoose, { Document, Schema } from "mongoose";
import { thirtyDaysFromNow } from "../../config/date-time";

export interface CategoryDocument extends Document {
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  totalQuiz: number;
  deleted: boolean;
}

const categorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    totalQuiz: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model<CategoryDocument>(
  "Category",
  categorySchema
);

export default CategoryModel;
