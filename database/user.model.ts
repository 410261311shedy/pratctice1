import { model, models, Schema, Document } from "mongoose";

//tell us which fields do we need, and make sure it accept proper TS types
export interface IUser {
   name: string;
   username: string;
   email: string;
   bio?: string;
   image?: string;
   location?: string;
   portfolio?: string;
   reputation?: number;
}
//Mongoose-specific fields like _id and timestamps that auto genertated
//For we can access fields like _id or id or
// any virtual methods provided by Mongoose on any kind of model
export interface IUserDoc extends IUser, Document {}
const UserSchema = new Schema<IUser>(
   {
      name: { type: String, required: true },
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      bio: { type: String },
      image: { type: String }, //URL
      location: { type: String },
      portfolio: { type: String },
      reputation: { type: Number, default: 0 },
   },
   { timestamps: true } //for generating timestamps on when the user was created
);

//give the user a name like user, and them pass the user schema right into it
///checl if models user already exist then use that, else create a new model
const User = models?.User || model<IUser>("User", UserSchema);

export default User;
