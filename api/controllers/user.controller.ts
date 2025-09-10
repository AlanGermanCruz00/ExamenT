import { Request, Response } from "express";
import dataBaseService from "../services/data-base.service";
import { Utils } from "../utils";
import jwt from "jsonwebtoken";

const utils = new Utils();
const SECRET_KEY = process.env.JWT_SECRET || "CASCADA";

class UserController {

    public async singIn(req: Request, res: Response) {
        const descriptionIn = "user[signIn]";
        const { email, password } = req.body;

            const userResult = await dataBaseService.pool?.query("CALL stp_sing_in(?,?)", [email, password]);
            const user = userResult ? userResult[0][0] : null;

            if (!user) {return res.status(401).json();}
          
            const token = jwt.sign({ id: user.id_user, email: user.email }, SECRET_KEY, { expiresIn: "1d" });
            return res.json(utils.response(descriptionIn, { ...user, token }, false));
    }
}

const userController = new UserController();
export default userController;
