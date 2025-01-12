import mongoose, { Document, Schema } from "mongoose";

export interface VerificationCodeDocument extends Document {
  createBy: string;
  code: string;
  name: string;
  quizId: string;
  quizName: string;
  type: "live" | "always" | "exam";
  endedAt: Date;
  startAt: Date;
  inRunning: boolean;
  totalQuestions: number;
  totalCorrect: number;
  totalPlayers: number;
  class: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema(
  {
    createBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    code: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    quizId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quizName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["live", "always", "exam"],
    },
    endedAt: {
      type: Date,
    },
    startAt: {
      type: Date,
      default: Date.now(),
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    totalAnswers: {
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
    totalPlayers: {
      type: Number,
      default: 0,
    },
    inRunning: {
      type: Boolean,
      default: true,
    },
    class: {
      type: Schema.Types.ObjectId,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const LessonModel = mongoose.model<VerificationCodeDocument>(
  "Lesson",
  LessonSchema
);

export default LessonModel;
