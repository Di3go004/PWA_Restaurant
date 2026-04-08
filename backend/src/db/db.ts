import { Pool } from "pg";
import dotenv from "dotenv";



// se cargan las variables de entorno
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // se utiliza para la conexion con neon db en modo de desarrollo
  ssl: {
    rejectUnauthorized: false,
  },
});


export const testConnection = async () => {
  try{
    const client = await pool.connect();
    console.log("Conexion exitosa a la base de datos");
    // esto sirve para liberar la conecion
    client.release();
  }catch(error){
    console.error("Error al conectar a la base de datos", error);
  }
};