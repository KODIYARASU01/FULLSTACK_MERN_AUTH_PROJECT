import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//SignUp
export const signUp = async (req, res, next) => {
  let { username, email, password } = req.body;

  //Secure the password by using bcryptjs
  let hashedPassword = await bcryptjs.hash(password, 10);
  let newUser = new User({ username, email, password: hashedPassword });
  try {
    if (!username || !email || !password) {
      //   return res.status(201).json({
      //     message: "Make sure to fill required Fields : username,email,password",
      //   });
      next(
        errorHandler(
          401,
          "Make sure to fill all required Fields : username,email,password"
        )
      );
    }
    await newUser.save();
    return res.status(201).json({ message: "User Created Sucessfully" });
  } catch (error) {
    next(error);
  }
};

//SignIn
export const signIn = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, "User Does Not Exist"));
    }
    let validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(401, "Wrong Credential");
    }
    //Create Token for specific user:
    let token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
    //Password remove to send client side user details:
    let { password: hashedPassword, ...rest } = validUser._doc;
    //Token expire time creating:
    let tokenExpire = new Date(Date.now() + 3600000); //1hr expire
    res
      .cookie("access_token", token, { httpOnly: true, expires: tokenExpire })
      .status(201)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
