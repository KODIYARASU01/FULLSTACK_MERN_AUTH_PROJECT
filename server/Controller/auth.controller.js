import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signUp = async (req, res, next) => {
  let { userName, email, password } = req.body;

  //Secure the password by using bcryptjs
  let hashedPassword = await bcryptjs.hash(password, 10);
  let newUser = new User({ userName, email, password: hashedPassword });
  try {
    if (!userName || !email || !password) {
      //   return res.status(201).json({
      //     message: "Make sure to fill required Fields : userName,email,password",
      //   });
      next(
        errorHandler(
          401,
          "Make sure to fill all required Fields : userName,email,password"
        )
      );
    }
    await newUser.save();
    return res.status(201).json({ message: "User Created Sucessfully" });
  } catch (error) {
    next(error);
  }
};
