const mysql = require('mysql2/promise');
const { environment } = require('./environment.dev');  

async function testConnection() {
  try {
    const conn = await mysql.createConnection({
      host: environment.database.host,
      user: environment.database.user,
      password: environment.database.password,
      database: environment.database.database,
    });
    console.log("✅ Conectado correctamente a MariaDB");
    await conn.end();
  } catch (err) {
    console.error("❌ Error al conectar a MariaDB:");
    process.exit(1);
  }
}

testConnection();
