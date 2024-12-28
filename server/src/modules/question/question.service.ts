import QuestionModel from "../../database/models/Question.model";
import { QuestionDto } from "../../interface/quizz.interface";

class QuestionService {
  public async create(data: QuestionDto) {
    const newQuestion = await QuestionModel.create({
        
    });
  }
}
