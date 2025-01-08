import LessonModel from "../../database/models/Lesson.model";
import LessonQuestionModel, {
  QuestionDocument,
} from "../../database/models/LessonQuestion";
import PlayerModel from "../../database/models/Player.model";
import PlayerResponseModel from "../../database/models/PlayerResponse";
import { QuizModel } from "../../database/models/Quiz.model";
import { PlayerDto, ProceedDto } from "../../interface/player.interface";
import { BadRequestException } from "../../utils/catch-errors";
import { lessonService } from "../lesson/lesson.module";

export class PlayerService {
  public async create(data: PlayerDto) {
    const lesson = await LessonModel.findById(data.lessonId);

    if (!lesson) {
      throw new BadRequestException("Không có lesson");
    }

    if (!lesson.inRunning) {
      throw new BadRequestException("Bài học đã kết thúc");
    }

    const newPlayer = await PlayerModel.create({
      lessonId: lesson._id,
      userId: data.userId || null,
      name: data.name,
    });

    if (!newPlayer) {
      throw new BadRequestException("Tham gia thất bại");
    }

    await LessonModel.findByIdAndUpdate(lesson._id, {
      $inc: {
        totalPlayers: 1,
      },
    });

    await QuizModel.findByIdAndUpdate(lesson._id, {
      $inc: {
        "stats.totalPlayers": 1,
      },
    });

    return newPlayer;
  }

  public async findById(id: string) {
    const player = await PlayerModel.findById(id);

    if (!player) {
      throw new BadRequestException("Không có cuộc chơi nào");
    }

    // if (!player.isRunning) {
    //   throw new BadRequestException("Cuộc chơi đã kết thúc");
    // }

    return player;
  }

  public async proceedGame(data: ProceedDto) {
    const lesson = await lessonService.findByLessonJoin(data.lessonId);

    const player = await this.findById(data.playerId);

    const question = await lessonService.findByIdQuestionLesson(
      data.questionId
    );

    let check = false;

    const response = data.response;
    let answer = question.answer;
    const options = question.options;

    if (question.type === "SGQ") {
      check = answer.includes(response[0]);
    } else if (question.type === "MTQ") {
      check = !answer.some((value) => !response.includes(value));
    } else if (question.type === "BLANK") {
      check =
        options[0].text.toString().toLocaleLowerCase() ===
        response[0].toString().toLocaleLowerCase();

      answer = [options[0].text];
    }

    const newPlayerResponse = await PlayerResponseModel.create({
      lessonId: data.lessonId,
      playerId: data.playerId,
      isCorrect: check,
      response: response,
      lessonQuestionId: data.questionId,
    });

    const answerPlayer = check
      ? {
          totalCorrect: 1,
        }
      : {
          totalWrong: 1,
        };

    await PlayerModel.findByIdAndUpdate(player._id, {
      $inc: {
        totalQuestionAnswer: 1,
        ...answerPlayer,
      },
      $push: {
        question: question._id,
      },
    });

    await LessonModel.findByIdAndUpdate(lesson._id, {
      $inc: {
        totalAnswers: 1,
        ...answerPlayer,
      },
    });

    await LessonQuestionModel.findByIdAndUpdate(data.questionId, {
      $inc: {
        "stats.totalAnswer": 1,
        ...(check ? { "stats.totalCorrect": 1 } : { "stats.totalWrong": 1 }),
      },
    });

    return {
      isCorrect: check,
      answer,
      data: newPlayerResponse,
    };
  }

  public async finishPlayer(id: string) {
    const player = await this.findById(id);

    await PlayerModel.findByIdAndUpdate(id, {
      isRunning: false,
      endPlay: Date.now(),
    });

    return true;
  }

  public async getDataFinishPlayer(id: string) {
    const player = await this.findById(id);

    const listQuestion = await LessonQuestionModel.find({
      lessonId: player.lessonId,
    });

    return {
      player: player,
      questions: listQuestion,
    };
  }

  public async playerLesson(id: string) {
    const listPlayer = await PlayerModel.find({
      lessonId: id,
    });

    return listPlayer;
  }

  public async findDetails(id: string) {
    const player = await this.findById(id);

    const listPlayerResponse = await PlayerResponseModel.find({
      playerId: id,
    }).populate("lessonQuestionId");

    const response = listPlayerResponse.map((item) => {
      const question = item.lessonQuestionId as QuestionDocument;

      const query = question.query;
      const answer = question.options.filter((option) => {
        const check = question.answer.includes(option.value);
        return check;
      });

      const response =
        question.type === "BLANK"
          ? item.response
          : question.options
              .filter((option) => {
                const check = item.response.includes(option.value);
                return check;
              })
              .map((option) => option.text);

      return {
        question,
        query,
        answer,
        response,
        isCorrect: item.isCorrect,
      };
    });

    return {
      player,
      response,
    };
  }
}
