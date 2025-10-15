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
            origin: [
                "http://localhost:4200",
                "http://localhost"],
            credentials: true
        }));

        this.app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
        this.app.use(bodyParser.json());
    }

    routes(): void {
        // Rutas de la API
        this.app.get('/api', (req, res) => {
            res.send('✅ Base "API" Correctamente ');
        });


        this.app.use("/api/users", userRoute);
        this.app.use("/api/animals", animalsRoutes);
        this.app.use("/api/documents", documentsRoutes);

        // Ruta raíz del servidor (opcional)
        this.app.get('/', (req, res) => {
            res.send('✅ API funcionando correctamente');
        });
    }



    start(): void {

        this.app.listen(3000, '0.0.0.0', () => {
            console.log('✅ Server');
        }); 

        dataBaseService.createConnections();
    }
}

const api = new Api();
api.start();

