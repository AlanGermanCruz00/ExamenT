import { Request, response, Response } from "express";
import dataBaseService from "../services/data-base.service";
import { Utils } from "../utils";
import path from "path";
import fs from 'fs';

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
            const [rows]: any = await dataBaseService.pool?.query('SELECT path_ FROM tbl_documents WHERE id_doc = ?',[id]);

            if (rows.length > 0) {
                const filePath = rows[0].path;
                if (filePath) {
                    const fullPath = path.join(__dirname, '../../uploads', filePath);
                    fs.unlink(fullPath, (err) => {
                        if (err) console.warn('No se pudo eliminar el archivo:', fullPath, err);
                    });
                }
            }
            await dataBaseService.pool?.query('DELETE FROM tbl_documents WHERE id_doc = ?', [id]);

            res.json(utils.response(desDocuments, id, false));
        } catch (err) {
            res.status(500).json(utils.response(desDocuments, err, true));
        }
    }

public async uploadDocuments(req: Request, res: Response){
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se recibió archivo" });
        }

        const file = req.file;
        const originalName = file.originalname;
        const fileNameSaved = file.filename;

        const mimeToExt: { [key: string]: string } = {
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
            'application/msword': '.doc',
            'application/pdf': '.pdf',
            'application/vnd.ms-excel': '.xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
        };

        const ext = mimeToExt[file.mimetype] || path.extname(originalName).toLowerCase();

        await dataBaseService.pool?.query("INSERT INTO tbl_documents (name, status_, type_, path_, create_at) VALUES (?, ?, ?, ?, NOW())",[originalName, "active", ext, fileNameSaved]);

        return res.status(200).json({
            message: "Archivo subido correctamente",
            file: {name: originalName,type: ext,path: fileNameSaved}
        });

    } catch (error: any) {

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json();}

    }
}


}


const controllerDocuments = new ControllerDocuments();
export default controllerDocuments


