import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  let { userName, email, password } = req.body;

  //Secure the password by using bcryptjs
  let hashedPassword = await bcryptjs.hash(password, 10);
  let newUser = new User({ userName, email, password: hashedPassword });
  try {
    if (!userName || !email || !password) {
      return res.status(201).json({
        message: "Make sure to fill required Fields : userName,email,password",
      });
    }
    await newUser.save();
    return res.status(201).json({ message: "User Created Sucessfully" });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "User creating failed" + error.message });
  }
};
