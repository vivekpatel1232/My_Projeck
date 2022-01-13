require("dotenv").config({ path: ".env" });
import express from "express";
import json from "body-parser/lib/types/json";
import ip from "ip";

const server = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

require("./src/config/connection");

import { userRoute, todoRoute } from "./src/routers";

server.use(json()); //use ak tiyp nu middleware thay gayu
server.use(userRoute);
server.use(todoRoute);

// server.listen(port, () => {
//   console.log(`server start on ${port}`);
// });

server.listen(PORT, () => {
  console.log(`API Runing at
  Localhost: http://${HOST}:${PORT}/
  LAN:http://${ip.address()}:${PORT}/`);
});
