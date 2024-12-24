import { UserDocument } from "../database/models/User.model";

declare global {
  namespace Express {
    interface Request {}

    interface RequestUser extends Request {
      user?: UserDocument;
      sessionId?: string;
    }

  }
}
