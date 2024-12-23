import { compareValue, hashVal } from "../../config/bcrypt.config";
import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  isGoogle: boolean;
  isVerify: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(value: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "/avatar.jpg",
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {},
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashVal(this.password, 10);
  }
});

userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);
};

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
