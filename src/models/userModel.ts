import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  AuthorName: string;
  email: string;
  password: string;
  PhoneNumber: string;
}
const UserSchema: Schema = new Schema<IUser>({
  AuthorName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  PhoneNumber: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;