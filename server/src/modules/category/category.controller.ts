import { HttpStatusCode } from "./../../config/http.config";
import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { CategoryService } from "./category.service";
import {
  categoryValidator,
  validatorSearch,
} from "../../validators/quizz.validator";
import { HTTPSTATUS } from "../../config/http.config";
import { BadRequestException } from "../../utils/catch-errors";

export class CategoryController {
  private categoryService: CategoryService;

  constructor(service: CategoryService) {
    this.categoryService = service;
  }

  public createCategory = asyncHandler(async (req: Request, res: Response) => {
    const body = categoryValidator.parse(req.body);

    const data = await this.categoryService.create(body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Tạo thành công",
      data,
    });
  });

  public pagingCategory = asyncHandler(async (req: Request, res: Response) => {
    const body = validatorSearch.parse(req.body);
    const data = await this.categoryService.paging(body);
    return res.status(HTTPSTATUS.OK).json(data);
  });

  public updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const body = categoryValidator.parse(req.body);
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException("Chưa truyền id");
    }

    const data = await this.categoryService.update(id, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Sửa thành công",
      data,
    });
  });

  public deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestException("Chưa truyền id");
    }

    const data = await this.categoryService.delete(id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Xóa thành công",
    });
  });

  public unDeleteCategory = asyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestException("Chưa truyền id");
      }

      const data = await this.categoryService.unDelete(id);

      return res.status(HTTPSTATUS.OK).json({
        message: "Xóa thành công",
      });
    }
  );

  public getOne = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException("Chưa truyền id");
    }

    const data = await this.categoryService.findById(id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Lấy thành công",
      data,
    });
  });

  public getAll = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.categoryService.getAll();

    return res.status(HTTPSTATUS.OK).json(data);
  });
}
