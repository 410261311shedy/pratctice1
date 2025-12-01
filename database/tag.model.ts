import { model, models, Schema, Document } from "mongoose";
//Types.ObjectId is from mongoose
export interface ITag {
   name: string;
   questions: number; //有套用此tag的文章數
}
export interface ITagDoc extends ITag, Document {}
const TagSchema = new Schema<ITag>({
   name: { type: String, unique: true, required: true },
   questions: { type: Number, default: 0 },
});

const Tag = models?.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
