import { model, models, Schema } from "mongoose";

//tell us which fields do we need, and make sure it accept proper TS types
export interface IUser {
   name: string;
   username: string;
   email: string;
   bio?: string;
   image: string;
   locations?: string;
   portfolio?: string;
   reputation?: string;
}

const UserSchema = new Schema(
   {
      name: { type: String, required: true },
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      bio: { type: String },
      image: { type: String, required: true }, //URL
      location: { type: String },
      portfolio: { type: String },
      reputation: { type: Number, default: 0 },
   },
   { timestamps: true } //for generating timestamps on when the user was created
);

//give the user a name like user, and them pass the user schema right into it
///checl if models user already exist then use that, else create a new model
const User = models?.user || model("User", UserSchema);

export default User;
