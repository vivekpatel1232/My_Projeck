import { Schema, model } from "mongoose";

let todoSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    name: { type: String },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timeseries: true,
    versionKey: false,
  }
);

const Todo = new model("todo", todoSchema);
export default Todo;
