import mongoose from "mongoose";
let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    profile:{
      type:String,
      default:'https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg'
    },
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);
export default User;
