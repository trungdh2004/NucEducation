import mongoose, { Document, Schema } from "mongoose";
import { QuestionDocument } from "./LessonQuestion";

export interface PlayerResponseDocument extends Document {
  playerId: string;
  response: number[];
  isCorrect: boolean;
  lessonId: string;
  lessonQuestionId: string | QuestionDocument;
}

const PlayerResponseSchema = new Schema(
  {
    playerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    lessonQuestionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "LessonQuestion",
    },
    response: [{ type: Schema.Types.Mixed }],
    isCorrect: {
      type: Boolean,
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const PlayerResponseModel = mongoose.model<PlayerResponseDocument>(
  "PlayerResponse",
  PlayerResponseSchema
);

export default PlayerResponseModel;
