import express from "express";
import { userController } from "../controller";
import { INTERNAL_LINKS } from "../enum";

import { authFile } from "../middelwares";

export default express
  .Router()
  .post(INTERNAL_LINKS.USER.SIGNUP, userController.signupUser)
  .post(INTERNAL_LINKS.USER.LOGIN, userController.login)
  .get(INTERNAL_LINKS.USER.FINDID, userController.findData)
  .get(INTERNAL_LINKS.USER.FINDALL, userController.findAll)
  .put(INTERNAL_LINKS.USER.PASSWORD, userController.updatePassword)
  .delete(INTERNAL_LINKS.USER.DELET, authFile, userController.deletData)
  .put(INTERNAL_LINKS.USER.UPDATE, authFile, userController.updateData);
