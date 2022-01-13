import express from "express";
import { todoController } from "../controller";
import { INTERNAL_LINKS } from "../enum";

export default express
  .Router()
  .put(INTERNAL_LINKS.TODO.ADDONE, todoController.todoAdd)
  .get(INTERNAL_LINKS.TODO.FINDDATA, todoController.todoFind)
  .get(INTERNAL_LINKS.TODO.FINDUSERID, todoController.findUserId)
  .get(INTERNAL_LINKS.TODO.FINDID, todoController.findId)
  .delete(INTERNAL_LINKS.TODO.DELET, todoController.deleteTodo);
