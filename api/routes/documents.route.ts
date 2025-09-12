import { Router } from "express";
import userController from "../controllers/user.controller";
import controllerDocuments from "../controllers/documents.controlles";
import { authMiddleware } from "../middlewares/auth.middleware";
import path from "path";
import multer from 'multer';


const storage = multer.diskStorage({destination: (req, file, cb) => {cb(null, 'uploads/');},
    filename: (req, file, cb) => {
        const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
        const savedFileName = Date.now() + "-" + cleanName;
        (req as any).savedFileName = savedFileName;
        cb(null, savedFileName);
    }
});

export const upload = multer({ storage });

class DocumentsRoutes {

    public router: Router = Router();
    constructor() { this.config(); }
    config(): void {

        this.router.get('/getdocuments', authMiddleware, controllerDocuments.showDocuments);
        this.router.delete('/deletedocuments/:id', authMiddleware, controllerDocuments.deleteDocuments);
        this.router.post('/updatedocuments', authMiddleware, upload.single("file"), controllerDocuments.uploadDocuments);

    }
}

const documentsRoutes = new DocumentsRoutes();
export default documentsRoutes.router;