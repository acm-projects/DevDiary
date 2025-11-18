// server/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
  },
  logs: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
