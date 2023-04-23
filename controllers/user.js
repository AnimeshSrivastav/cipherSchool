import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const name = async (req, res) => {
  res.send("HEllo me");
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    res.status(200).json(data);
  } else {
    res.status(500).json("Invalid Password");
  }
};

export const updateUser = async (req, res) => {
  const { email, newEmail, firstName, lastName } = req.body;
  const user = await User.updateOne(
    {
      email: email,
    },
    { $set: { firstName: firstName, lastName: lastName, email: newEmail } }
  );

  const newUser = await User.findOne({ email: newEmail });
  const data = {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  };
  res.status(200).json(data);
};

export const updatePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  const user = await User.findOne({ email: email });

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (isMatch) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);
    const Updateuser = await User.updateOne(
      {
        email: email,
      },
      { $set: { password: passwordHash } }
    );

    res.send("Password Updated");
  }
};
