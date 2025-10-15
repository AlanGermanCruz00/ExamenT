import { Router } from "express";
import userController from "../controllers/user.controller";
import Controlleranimal from "../controllers/animals.controlles"; 
import { authMiddleware } from "../middlewares/auth.middleware";

class AnimalsRoutes {
    public router: Router = Router();

    constructor() {this.config();}
    config(): void {
    
   
        this.router.get('/getAll', authMiddleware, Controlleranimal.showAnimals);
        this.router.post('/create', authMiddleware, Controlleranimal.AddAnimals);
        this.router.delete('/delete/:id', authMiddleware, Controlleranimal.deleteAnimals);
        this.router.put('/update/:id', authMiddleware, Controlleranimal.updateAnimals);


    }
}

const animalsRoutes = new AnimalsRoutes();
export default animalsRoutes.router;