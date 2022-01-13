import { todoModel } from "../modal";
import { ObjectId } from "mongodb";

const todoFind = async (req, res) => {
  try {
    let getAllData = await todoModel.find({});
    let totalData = getAllData.length;

    let pageQuiry = req.query.page;
    let limit = req.query.limit;
    let skip = (pageQuiry - 1) * limit;

    // let todoList = await todoModel
    //   .find()
    //   .skip(+skip)
    //   .limit(+limit);

    // let todoList = await todoModel.find({})

    let todoList = await todoModel.aggregate([
      {
        $match: {},
      },
      {
        $skip: +skip,
      },
      {
        $limit: +limit,
      },
    ]);

    let list = todoList.length;

    res.send({
      success: true,
      data: todoList,
      totallistData: list,
      totalData: totalData,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const todoAdd = async (req, res) => {
  try {
    let savedata = await todoModel.create(req.body);
    if (!savedata) {
      throw new Error("data not exist");
    }

    savedata && res.send({ success: true, message: savedata });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const findUserId = async (req, res) => {
  try {
    // let todoList = await todoModel.find({
    //   userId: req.params.id,
    // });

    let todoList = await todoModel.aggregate([
      {
        $match: { userId: ObjectId(req.params.id) },
      },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);

    res.send({ success: true, data: todoList });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const findId = async (req, res) => {
  try {
    // let todoList = await todoModel.find({ _id: req.params.id });

    let todoList = await todoModel.aggregate([
      {
        $match: { _id: ObjectId(req.params.id) },
      },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          "user.email": 1,
          "user.password": 1,
        },
      },
    ]);

    res.send({ success: true, data: todoList });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    let todoList = await todoModel.deleteOne({ userId: req.params.id });

    res.send({ success: true, message: "user delete" });
  } catch (error) {
    res.send({ success: false, message: "user not exist" });
  }
};

export default { todoAdd, todoFind, findUserId, deleteTodo, findId };
