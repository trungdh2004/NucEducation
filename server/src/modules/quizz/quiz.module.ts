import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";

const quizService = new QuizService();
const quizController = new QuizController(quizService);
export { quizService, quizController };
