import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { UserService } from "./user.service";
import { HTTPSTATUS } from "../../config/http.config";
import { RequestUser } from "../../interface/config.interface";
import { BadRequestException } from "../../utils/catch-errors";
import UserModel from "../../database/models/User.model";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getUserById = asyncHandler(async (req: Request, res: Response) => {
    console.log("zo r nè");

    return res.json({ user: "Đã trả về" });
  });

  public getCurrent = asyncHandler(async (req: RequestUser, res: Response) => {
    const user = req.user;

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const data = await this.userService.getUserById(user?._id as string);

    return res.status(HTTPSTATUS.OK).json({
      data,
      message: "Request successful",
    });
  });

  public getListUser = asyncHandler(async (req: RequestUser, res: Response) => {
    const listUser = await UserModel.find();

    return res.status(HTTPSTATUS.OK).json({
      listUser,
    });
  });
}
