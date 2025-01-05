import mongoose, { Document, Schema } from "mongoose";

export interface PlayerDocument extends Document {
  name: string;
  userId?: string;
  startPlay: Date;
  endPlay: Date;
  lessonId: string;
  totalCorrect: number;
  totalWrong: number;
  totalQuestionAnswer: number;
  isRunning: boolean;
  question: string[];
}

const PlayerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    startPlay: {
      type: Date,
      default: Date.now(),
    },
    endPlay: {
      type: Date,
      default: null,
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    totalCorrect: {
      type: Number,
      default: 0,
    },
    totalWrong: {
      type: Number,
      default: 0,
    },
    totalQuestionAnswer: {
      type: Number,
      default: 0,
    },
    isRunning: {
      default: true,
      type: Boolean,
    },

    question: [
      {
        type: Schema.Types.ObjectId,
        ref: "LessonQuestion",
      },
    ],
  },
  { timestamps: true }
);

const PlayerModel = mongoose.model<PlayerDocument>("Player", PlayerSchema);

export default PlayerModel;
