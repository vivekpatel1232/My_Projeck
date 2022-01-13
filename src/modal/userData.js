import { Schema, model } from "mongoose";

let userSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    name: { type: String },
    phone: { type: String },
    // userId: { type: Schema.Types.ObjectId },
  },
  {
    timeseries: true,
    versionKey: false,
  }
);

// module.exports = mongoose.model("users", userSchema);
const User = new model("user", userSchema);
export default User;
