import Jwt from "jsonwebtoken";
import { userModel } from "../modal";
import { ObjectId } from "mongodb";

const signupUser = async (req, res) => {
  try {
    let { email, password, name, phone } = req.body;
    console.log(email);

    let userExist = await userModel.findOne({ email: email });
    console.log(userExist);

    // let userExist = await userModel.aggregate([
    //   {
    //     $match: {
    //       email: email,
    //     },
    //   },
    // ]);

    if (userExist) throw new Error("email is already used");

    let savedData = await userModel.create(req.body);

    savedData &&
      res.send({
        success: true,
        message: "sing up successfully",
      });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let userExist = await userModel.findOne({
      email: email,
      password: password,
    });

    // let userExist = await userModel.aggregate([
    //   {
    //     $match: {
    //       email: email,
    //       password: password,
    //     },
    //   },
    // ]);

    if (!userExist) throw new Error("user not exist");
    const mySecretKey = process.env.SECRETKEY || "mySecretKey";

    let token = Jwt.sign(
      { id: userExist.id, email: userExist.email },
      mySecretKey,
      { expiresIn: "1h" }
    );

    userExist &&
      res.send({
        success: true,
        message: "Login successfull",
        data: { userId: userExist.id, email: userExist.email, token: token },
      });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, message: err.message });
  }
};

const findData = async (req, res) => {
  try {
    // let { userId } = req.body;
    // let filter = {};

    // if (userId) {
    //   filter = { userId: userId };
    // }

    // if (password) {
    //   filter = { ...filter, password: password };
    // }

    // const userData = await User.find(filter);
    // res.send(userData);

    // userModel.find({ userId }, function (err, users) {
    //   if (err) console.log(err);
    //   console.warn(users);
    //   res.send(users);
    // });

    // let userExist = await userModel.find({ _id: req.params.id });
    let userExist = await userModel.aggregate([
      {
        $match: { _id: ObjectId(req.params.id) },
      },
      { $project: { _id: 0, email: 1, password: 1 } },
    ]);

    res.send({ success: true, data: userExist });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    let pageQuery = req.query.page;
    let limit = req.query.limit;
    let skip = (pageQuery - 1) * limit;

    console.log("skip:", skip);
    console.log("Limit:", limit);

    let userExist = await userModel
      .find()
      .skip(+skip)
      .limit(+limit);

    // (not working)let userExist = await userModel.aggregate([
    //   {
    //     $match: {},
    //   },

    //   { $limit: 5 },
    //   { $skip: 2 },
    // ]);

    console.log("DATA:", userExist);

    res.send({ success: true, data: userExist });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    let { newPassword } = req.body;

    // let userExist = await userModel.findOne({
    //   email: email,
    //   password: password,
    // });
    let userExist = await userModel.aggregate([
      {
        $match: {
          email: email,
          password: password,
        },
      },
    ]);
    if (!userExist) throw new Error("user not exist");

    let updatData = await userModel.findOneAndUpdate(
      { email: email },
      { password: newPassword }
    );

    updatData && res.send({ success: true, message: "upadated" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
};

const deletData = async (req, res) => {
  try {
    let userExist = await userModel.deleteOne({ _id: req.params.id });
    // let { Email } = req.body;
    // let userExist = await userModel.deleteOne({ Email: Email });

    if (!userExist) {
      throw new Error("user not extist");
    }
    res.send({ success: true, message: "user delet" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    console.log("in update data");
    // let userExist = await userModel.updateOne({ _id: req.params.id }, req.body);
    // if (!userExist) {
    //   throw new Error("user is not found");
    // }
    // console.log(req.params.id);
    // console.log();
    let userKey = req.decodKey;

    let userExist = await userModel.updateOne({ _id: req.params.id }, req.body);

    if (!req.body.email) {
      throw new Error("please check updateUser details");
    }

    res.send({
      success: true,
      message: "upadated",
      data: { Id: userKey.id, email: userKey.email },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
};

export default {
  signupUser,
  login,
  findData,
  updatePassword,
  deletData,
  updateData,
  findAll,
};
