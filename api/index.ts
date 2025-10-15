import express, { Application } from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/users.route';
import morgan from 'morgan';
import cors from 'cors';
import dataBaseService from './services/data-base.service';
import animalsRoutes from './routes/animals.route';
import documentsRoutes from './routes/documents.route';
import path from 'path';


class Api {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        // 📌 Logger HTTP
        this.app.use(morgan('dev'));

        this.app.set('port', 3000);

        this.app.use(cors({
            origin: "http://localhost:4200",
            credentials: true
        }));

        this.app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
        this.app.use(bodyParser.json());
    }

    routes(): void {
        // this.app.use("/test", testRoutes);
        // this.app.use("/acceso", testUsuario);
        this.app.use("/api/users", userRoute);
        this.app.use("/api/animals", animalsRoutes);
        this.app.use("/api/documents", documentsRoutes)

    }

    start(): void {this.app.listen(this.app.get('port'), () => {
            console.log('✅ Server on port', this.app.get('port'));});

        dataBaseService.createConnections();
    }
}

const api = new Api();
api.start();
