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
  answer: (number | string)[];
  options: IOptionsQuestion[];
  lessonId: string;
  quizId: string;
}

export interface IOptionsQuestion {
  text: string;
  value: number;
}

const LessonQuestion = new Schema(
  {
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      required: true,
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
    answer: [
      {
        type: Number,
        required: true,
      },
    ],
    options: [
      {
        text: {
          type: String,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
    stats: {
      totalAnswer: {
        type: Number,
        default: 0,
      },
      totalCorrect: {
        type: Number,
        default: 0,
      },
      totalWrong: {
        type: Number,
        default: 0,
      },
      totalTime: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const LessonQuestionModel = mongoose.model<QuestionDocument>(
  "LessonQuestion",
  LessonQuestion
);

export default LessonQuestionModel;
