import { pool } from "../db/db";

export class PlatilloRepository{

  // funcion asincrona para crear un platillo 
  static async crearP(
    nombre: string,
    descripcion: string,
    precio: number,
  ){
    const query = `SELECT * FROM sp_crear_platillo($1, $2, $3)`;
    const values = [nombre, descripcion, precio];

    const result = await pool.query(query, values);
    return result.rows[0].sp_crear_platillo;
  }
}