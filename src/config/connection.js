import { connect, connection } from "mongoose";

const DATABASE_NAME = process.env.DATABASE_NAME;
const CONNECTION_URL = process.env.CONNECTION_URL + DATABASE_NAME;

connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;

db.on("error", () => {
  console.error("Error occured in db connection");
});

db.on("open", () => {
  console.log(`DB Connection with  ${DATABASE_NAME} established successfully`);
});

// .then(() => {
//   console.warn("db connect");
// });
