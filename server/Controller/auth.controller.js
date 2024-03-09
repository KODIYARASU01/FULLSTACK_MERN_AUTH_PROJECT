import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//SignUp
export const signUp = async (req, res, next) => {
  let { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      next(errorHandler(401, "Fill Up All required Fields"));
    } else {
      //Secure the password by using bcryptjss
      let hashedPassword = bcryptjs.hashSync(password, 10);
      let newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      return res.status(201).json({ message: "User Created Sucessfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: error.message });
  }
};

//SignIn
export const signIn = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(errorHandler(401, "Make Sure to Fill required fields"));
    }

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
      .json({ rest, message: "User Login Sucessfully" });
  } catch (error) {
    next(error);
  }
};

//Google:

// export const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
//       //Password remove to send client side user details:
//       let { password: hashedPassword, ...rest } = validUser._doc;
//       //Token expire time creating:
//       let tokenExpire = new Date(Date.now() + 3600000); //1hr expire
//       res.cookie("access_token", token, {
//         httpOnly: true,
//         expires: tokenExpire,
//       }).json(rest)
//       // return res.status(201).json({ message: "User Login Sucessfully" });
//     } else {
//       const generatePassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       //Secure the password by using bcryptjss
//       const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
//       let newUser = new User({
//         username:
//           req.body.username.split(" ").join("").toLowerCase() +
//           Math.floor(Math.random() * 1000).toString(),
//         email: req.body.email,
//         password: hashedPassword,
//         profile: req.body.profile,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
//       //Password remove to send client side user details:
//       let { password: hashedPassword2, ...rest } = validUser._doc;
//       //Token expire time creating:
//       let tokenExpire = new Date(Date.now() + 3600000); //1hr expire
//       res.cookie("access_token", token, {
//         httpOnly: true,
//         expires: tokenExpire,
//       }).json(rest)
//       // return res.status(201).json({rest, message: "User Created Sucessfully" });
//     }
//   } catch (err) {
//     next(err)
//   }
// };

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 1000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profile: req.body.profile,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
