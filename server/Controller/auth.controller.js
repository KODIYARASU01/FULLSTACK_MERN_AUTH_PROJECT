import User from "../model/user.model.js";

export const signUp = async (req, res) => {
  let { userName, email, password } = req.body;
  let newUser = new User({ userName, email, password });

  try {
    if (!userName || !email || !password) {
      return res
        .status(201)
        .json({
          message:
            "Make sure to fill required Fields : userName,email,password",
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
