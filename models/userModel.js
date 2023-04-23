import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
  },
  followers: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
