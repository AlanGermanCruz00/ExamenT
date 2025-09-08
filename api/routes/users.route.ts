import { Router } from "express";
import userController from "../controllers/user.controller";

class UserRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post('/login', userController.singIn);

  }
}

export default new UserRoutes().router;
