import jwt from 'jsonwebtoken';

//esta es para el funcionamiento del login
export const generarToken = (id: string, rol: string) => {
  //se genera el token con el id y el rol del usuario y expira en 8horas

  return jwt.sign({id, rol},
    process.env.JWT_SECRET as string, {
      expiresIn: '8h'
    });
};