import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";

const questionService = new QuestionService();
const questionController = new QuestionController(questionService);

export { questionController, questionService };
