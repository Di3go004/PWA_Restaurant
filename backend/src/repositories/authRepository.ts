import { pool } from "../db/db";

export class AuthRepository{

  static async registrar(
    nombre: string, 
    constasena: string,
    rol: string){

      const query = `SELECT * FROM sp_crear_usuario($1, $2, $3)`;
      const values = [nombre, constasena, rol];

      const result = await pool.query(query, values);
      return result.rows[0];

  }

  static async buscarUsuarioPorNombre(
    nombre: string
  ){
    const query = `SELECT * FROM usuarios WHERE nombre = $1`;
    const values = [nombre];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async actualizarUsuario(
    id: string,
    nombre: string | null,
    contrasena: string | null,
    rol: string | null
  ){
    const query = `SELECT * FROM sp_actualizar_usuario($1, $2, $3, $4)`;
    const values = [id, nombre, contrasena, rol];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async eliminarUsuario(
    id: string
  ){
    const query = `SELECT * FROM sp_eliminar_usuario($1)`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async obtenerTodos(){
    const query = `SELECT id, nombre, rol FROM usuarios WHERE activo = true`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async obtenerPorId(
    id: string
  ){
    const query = `SELECT id, nombre, rol FROM usuarios WHERE id = $1 and activo = true`;
    const values = [id];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}