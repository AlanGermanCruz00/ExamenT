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

        try {const userResult = await dataBaseService.pool?.query("CALL stp_U_user(?, ?)",[email, password]);

            const user = userResult ? userResult[0][0] : null;

            if (!user) {
                return res.status(401).json(utils.response(descriptionIn, "Usuario no encontrado", true));
            }

          
            const token = jwt.sign({ id: user.id_user, email: user.email }, SECRET_KEY,{ expiresIn: "1d" });
            return res.json(utils.response(descriptionIn, { ...user, token }, false));
        } catch (error) {
            console.error("Error en login:", error);
            return res.status(500).json();
        }
    }
}

const userController = new UserController();
export default userController;
