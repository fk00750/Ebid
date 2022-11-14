import { Schema, model } from "mongoose";
import { generatePassword } from "../utils/helperFunctions";

interface IUser {
  username: string;
  email: string;
  password: string;
  role?: string;
}

/**
{
  "username":"Admin",
  "email":"Admin001@gmail.com",
  "password":"qazplmvb56@admin.com"
}
*/

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please Provide Username"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
  },
  role: {
    type: String,
    default: "customer",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword: string = await generatePassword(this.password);
    this.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});

const User = model<IUser>("User", UserSchema);

export default User;
