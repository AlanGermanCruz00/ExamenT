const privateKey = '';
const certificate = '';

export const environment = {
  production: false,
  credentials: {
    key: privateKey,
    cert: certificate
  },
  database: {
    host: '192.168.1.177',  
    user: 'root',
    password: 'root',
    database: 'prueba'
  },
  hostApi: 'http://192.168.1.180:3000/api' 
};
