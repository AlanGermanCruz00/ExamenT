import { Request, response, Response } from "express";
import dataBaseService from "../services/data-base.service";
import { Utils } from "../utils";
import path from "path";
import fs from 'fs';

const utils = new Utils()

class ControllerDocuments {

    public async showDocuments(req: Request, res: Response) {
        const descriptionGC = "documents[show]";
        dataBaseService.pool?.query('CALL stp_GC_documents()').then((Docs) => {
            const documents = Docs[0];
            res.json(utils.response(descriptionGC, documents, false));
        }).catch((err) => { res.status(500).json(utils.response(descriptionGC, err, true)); });


    }


    public async deleteDocuments(req: Request, res: Response) {
        const descriptionD = "documents[delete]";
        const { id } = req.params;
        dataBaseService.pool?.query('CALL stp_D_documents(?)', [id]).then(() => {
            res.json(utils.response(descriptionD, { id, deleted: true }, false));
        }).catch((err) => { res.status(500).json(utils.response(descriptionD, err, true)); });

    }


    public async uploadDocuments(req: Request, res: Response) {
        const descriptionC = "documents[create]";

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

            dataBaseService.pool?.query('CALL stp_C_document(?,?,?,?)', [originalName, "active", ext, fileNameSaved]).then((Docs) => {
                const idDocs = Docs[0][0].id;

                res.json(utils.response(descriptionC, idDocs, false));
            }).catch((err) => { res.status(500).json(utils.response(descriptionC, err, true)); });

        } catch (error: any) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: "Ya existe un documento con ese nombre" });
            }
            return res.status(500).json(utils.response(descriptionC, error, true));
        }
    }


}


const controllerDocuments = new ControllerDocuments();
export default controllerDocuments


