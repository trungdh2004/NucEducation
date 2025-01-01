import mongoose, { Schema } from "mongoose";
import { QuestionDocument } from "./Question.model";

interface QuizDocument extends Document {
  name: string;
  deleted: boolean;
  isLoved: boolean;
  createBy: string;
  lifetimeAccess: boolean;
  type: string;
  description: string;
  stats: {
    lesson: number;
    totalCorrect: number;
    totalQuestions: number;
    totalPlayers: number;
  };
  image: string;
  questions: any[];
  category: string;
  level: number;
  isPublic: boolean;
  publicAt: Date;
  difficulty: 1 | 2 | 3;
}

const QuizSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 64,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    isLoved: {
      type: Boolean,
      default: false,
    },
    createBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    lifetimeAccess: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
    stats: {
      lesson: {
        type: Number,
        default: 0,
      },
      totalCorrect: {
        type: Number,
        default: 0,
      },
      totalQuestions: {
        type: Number,
        default: 0,
      },
      totalPlayers: {
        type: Number,
        default: 0,
      },
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dundmo7q8/image/upload/v1735309342/nuceducation/zzz8exzd4dnnlzcb6vdk.png",
    },
    questions: [],
    category: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: "Category",
    },
    level: {
      type: Number,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    publicAt: {
      type: Date,
    },
    difficulty: {
      type: Number,
      enum: [1, 2, 3], // Các giá trị cố định
      default: 1, // Giá trị mặc định
    },
  },
  { timestamps: true }
);

export const QuizModel = mongoose.model<QuizDocument>("Quiz", QuizSchema);
