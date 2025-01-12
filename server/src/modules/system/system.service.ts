import LessonModel from "../../database/models/Lesson.model";
import { QuizModel } from "../../database/models/Quiz.model";
import UserModel from "../../database/models/User.model";

export class SystemService {
  async dataService() {
    const countQuiz = await QuizModel.countDocuments({
      deleted: false,
    });

    const countLesson = await LessonModel.countDocuments();

    const countUser = await UserModel.countDocuments();

    return {
      countQuiz,
      countLesson,
      countUser,
    };
  }
}
