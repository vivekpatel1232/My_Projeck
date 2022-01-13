import Jwt from "jsonwebtoken";

const authorizationFile = async (req, res, next) => {
  try {
    console.log("in authData");
    let tokenAuth = await req.headers.authorization;

    if (!tokenAuth) {
      throw new Error("please check Auth ");
    }

    let token = await req.headers.authorization.split(" ")[1];

    const mySecretKey = process.env.SECRETKEY || "mySecretKey";
    let decodedToken = await Jwt.verify(token, mySecretKey);

    let Decodid = decodedToken.id;

    if (Decodid != req.params.id) throw new Error("YOU ARE NOT VALID USER");

    req.decodKey = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: false,

      message: error.message,
    });
  }
};

export default authorizationFile;
