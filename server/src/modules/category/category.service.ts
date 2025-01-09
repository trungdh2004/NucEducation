import { formatResponse } from "../../config/response";
import CategoryModel from "../../database/models/Category.model";
import { CategoryDto } from "../../interface/category.interface";
import { SearchObjectTab } from "../../interface/search.interface";
import { BadRequestException } from "../../utils/catch-errors";

export class CategoryService {
  public async create(data: CategoryDto) {
    const category = await CategoryModel.create({
      name: data.name,
      description: data.description,
      image: data.image,
    });

    if (!category) {
      throw new BadRequestException("Tạo thất bại");
    }

    return category;
  }

  public async paging(data: SearchObjectTab) {
    const limit = data.pageSize || 10;
    const skip = (data.pageIndex - 1) * limit || 0;

    const queryKey = data.keyword
      ? {
          name: {
            $regex: data.keyword,
            $options: "i",
          },
        }
      : {};

    const queryDeleted = {
      deleted: data.tab === 0 ? true : false,
    };

    const listData = await CategoryModel.find({
      ...queryKey,
      ...queryDeleted,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const countData = await CategoryModel.countDocuments({
      ...queryKey,
      ...queryDeleted,
    });

    return formatResponse({
      skip,
      limit,
      data: listData,
      count: countData,
    });
  }

  public async update(id: string, data: CategoryDto) {
    const exisCate = await CategoryModel.findById(id);
    if (!exisCate) {
      throw new BadRequestException("Không có môn học này");
    }
    const update = await CategoryModel.findByIdAndUpdate(
      id,
      {
        name: data.name,
        description: data.description,
        image: data.image,
      },
      { new: true }
    );

    return update;
  }

  public async delete(id: string) {
    const exisCate = await CategoryModel.findById(id);
    if (!exisCate) {
      throw new BadRequestException("Không có môn học này");
    }

    const update = await CategoryModel.findByIdAndUpdate(id, {
      deleted: true,
    });

    return update;
  }

  public async unDelete(id: string) {
    const exisCate = await CategoryModel.findById(id);
    if (!exisCate) {
      throw new BadRequestException("Không có môn học này");
    }
    const update = await CategoryModel.findByIdAndUpdate(id, {
      deleted: false,
    });

    return update;
  }

  public async findById(id: string) {
    const exisCate = await CategoryModel.findById(id);
    if (!exisCate) {
      throw new BadRequestException("Không có môn học này");
    }

    return exisCate;
  }

  public async getAll() {
    const exisCate = await CategoryModel.find({
      deleted: false,
    });

    return exisCate;
  }
}
