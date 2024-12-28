import mongoose, { Document, Schema } from "mongoose";

export interface QuestionDocument extends Document {
  aiGenerated: boolean;
  time: number;
  type: "MTQ" | "SGQ" | "BLANK";
  createdAt: Date;
  updatedAt: Date;
  query: {
    text: string;
    image: string | null;
  };
  answer: number | number[];
  deleted: boolean;
  options: IOptionsQuestion[];
  quizId: string;
}

export interface IOptionsQuestion {
  text: string;
  value: number;
}

const questionSchema = new Schema(
  {
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    quizId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    time: {
      type: Number,
      default: 30000,
      required: true,
    },
    type: {
      type: String,
      enum: ["MTQ", "BLANK", "SGQ"],
      default: "SGQ",
    },
    query: {
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: null,
      },
    },
    answer: {
      type: Schema.Types.Mixed,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    options: {
      text: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const QuestionModel = mongoose.model<QuestionDocument>(
  "Question",
  questionSchema
);

export default QuestionModel;
