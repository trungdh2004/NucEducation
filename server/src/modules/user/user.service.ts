import UserModel, { UserDocument } from "../../database/models/User.model";
import { BadRequestException } from "../../utils/catch-errors";

export class UserService {
  public async getUserById(id: string): Promise<UserDocument> {
    if (!id) {
      throw new BadRequestException("User id is required");
    }

    const user = await UserModel.findById(id);

    if (!user) {
      throw new BadRequestException("User not found");
    }

    return user;
  }
 
}
