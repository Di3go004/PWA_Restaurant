import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import console = require('node:console');

// usamos Request para poder intectar el usuario

export interface AuthRequest extends Request {
  user?: {id: string, rol: string}
}


//primer guardia verifica el token jwt es valido

export const verificarToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  //obtememos el token bearer token
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    res.status(401).json({message: 'Acceso denegado: No se proporciono un token valido'});
    return;
  }

  const token = authHeader.split(' ')[1];

  //verificamos de manera matematica la firma del token

  try{
    const payload = jwt.verify( token,
      process.env.JWT_SECRET as string
    ) as unknown as {id: string, rol: string};

    // se inyecta la info del usuario en la request para que otras la usen despues
    req.user = payload;
    next();
  }catch(error){
    res.status(401).json({message: 'Token invalido o expirado '});
    return;
  }
};

//segundo guardian fabrica un middeleware dinamico segun los roles que le pases 

export const verificarRol = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if(!req.user){
      res.status(401).json({message: 'no hay ususario autenticado'});
      return;
    }

    const rolUsuario = req.user.rol;

    if(!roles.includes(rolUsuario)){
      res.status(403).json({message: 'Acceso denegado: No tienes permiso para acceder a este recurso'});
      return;
    }

    next();
  }
    
}
