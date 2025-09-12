import { Request, response, Response } from "express";
import dataBaseService from "../services/data-base.service";
import { Utils } from "../utils";
import path from "path";

const utils = new Utils()

class ControllerDocuments {

    public async showDocuments(req: Request, res: Response) {
        const descriptionS = "documents[show]";
        try {
            const rows: any = await dataBaseService.pool?.query(`SELECT id_doc, name, status_, type_, path_, create_at FROM tbl_documents `);
            res.json(utils.response(descriptionS, rows, false));
        } catch (err) { res.status(500).json(utils.response(descriptionS, err, true)); }
    }


    public async deleteDocuments(req: Request, res: Response) {
        const desDocuments = "documents[delete]";

        const { id } = req.params;
        try {
            await dataBaseService.pool?.query('DELETE FROM tbl_documents WHERE id_doc = ?', [id]);
            res.json(utils.response(desDocuments, id, false));
        } catch (err) { res.status(500).json(utils.response(desDocuments, err, true)); }
    }


    public async uploadDocuments(req: Request, res: Response) {
     
            if (!req.file) return res.status(400).json();

            const originalName = req.file.originalname;
            const extension = path.extname(originalName).toLowerCase();
            const savedPath = `/uploads/${req.file.filename}`;

            await dataBaseService.pool?.query("INSERT INTO tbl_documents (name, status_, type_, path_, create_at) VALUES (?, ?, ?, ?, NOW())", [originalName, "active", extension, savedPath]);

            return res.status(200).json({file: { name: originalName, path: savedPath }});
      
    }

}

const controllerDocuments = new ControllerDocuments();
export default controllerDocuments


