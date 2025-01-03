import LessonModel from "../../database/models/Lesson.model";
import LessonQuestionModel from "../../database/models/LessonQuestion";
import PlayerModel from "../../database/models/Player.model";
import PlayerResponseModel from "../../database/models/PlayerResponse";
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

    return newPlayer;
  }

  public async findById(id: string) {
    const player = await PlayerModel.findById(id);

    if (!player) {
      throw new BadRequestException("Không có cuộc chơi nào");
    }

    if (!player.isRunning) {
      throw new BadRequestException("Cuộc chơi đã kết thúc");
    }

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
    const answer = question.answer;

    if (question.type === "SGQ") {
      check = answer.includes(response[0]);
    } else if (question.type === "MTQ") {
      check = !response.some((value) => !answer.includes(value));
    } else if (question.type === "BLANK") {
      check =
        answer[0].toString().toLocaleLowerCase() ===
        response[0].toString().toLocaleLowerCase();
    }

    const newPlayerResponse = await PlayerResponseModel.create({
      lessonId: data.lessonId,
      playerId: data.playerId,
      isCorrect: check,
      response: response,
    });
  }
}
