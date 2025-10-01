import { environment } from '../environments/environment.dev';
import mysql, { Pool } from 'promise-mysql';
import dictionaryUtils from '../dictionary.utils';

class DataBaseService {
    public pool: mysql.Pool | null = null;

    async createConnections() {
        this.pool = await this.createPoolConnection(environment.database);
       //console.log('Conexion');
    }
    
    createPoolConnection(environment: any): Promise<mysql.Pool> {
        return new Promise((resolve, reject) => {

            // mysql.createPool(environment).then(pool => 
            //         resolve(pool))
            //     .catch(err => reject(err));
            mysql.createPool(environment).then((resPool)=>{
                resPool.getConnection().then(()=>{
                    console.log(dictionaryUtils.labels.succesConexionDB + ' ' + dictionaryUtils.labels.database + ' ' + environment.database)
                })
            resolve(resPool)
            }).catch((err)=>{
                reject(err)
            })
        });
    }

}


const dataBaseService = new DataBaseService();
export default dataBaseService;