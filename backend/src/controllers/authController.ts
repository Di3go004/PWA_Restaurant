import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories/authRepository";
import { generarToken } from "../utils/jwt";

export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
  try{
    const {nombre, contrasena, rol} = req.body;

    //creamos el encriptado
    const salt = 10;
    const hashedContrasena = await bcrypt.hash(contrasena, salt);

    //se manda la contraseania hasheada al repository
    const nuevoUsuario = await AuthRepository.registrar(nombre, hashedContrasena, rol);
  
    res.status(201).json({
      message: `Usuario ${nombre} registrado exitosamente`,
      usuario: nuevoUsuario
    })

    

    
  }catch(error){
    console.error("Error al registrar usuario", error);
    res.status(500).json({message: 'Error a la hora de crear la ususario '});
  }
}



export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
      const {nombre, contrasena} = req.body;

      //verificamos que el usuario exista
      const usuario = await AuthRepository.buscarUsuarioPorNombre(nombre);

      if(!usuario){
        res.status(401).json({message: 'Usuario no encontrado'});
        return;
      }

      //comparamos la contrase
      const esCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);

      if(!esCorrecta){
        res.status(401).json({message: 'Contraseña incorrecta'});
        return;
      }

      const token = generarToken(usuario.id, usuario.rol);

        res.status(200).json({
          message: 'Login exitoso',
          token: token,
          usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          rol: usuario.rol
        }
      });

    }catch(error){
      console.error("Error al iniciar sesion", error);
      res.status(500).json({message: 'Error a la hora de iniciar sesion '});
    }
}

export const actualizarUsuario = async (req: Request, res: Response): Promise<void> => {
  try{
    const {id} = req.params;
    const {nombre, contrasena, rol } = req.body;

    //validar que el  que el id exista 

    if(!id){
      res.status(400).json({message: 'No se envio el id del usuario'});
      return;
    }
    
    if(!nombre && !contrasena && !rol){
      res.status(400).json({message: 'Debes cambiar un campo por lo menos'});
      return;
    }

    let contraseniaHash = null;
    if(contrasena){
      const salt = 10;
      contraseniaHash = await bcrypt.hash(contrasena, salt);
    }

    //le madamos las variables al repo y si van vacias se ignoran
    const usuarioActualizado = await AuthRepository.actualizarUsuario(id as string, nombre || null, contraseniaHash, rol || null);
    
    if(!usuarioActualizado){
      res.status(404).json({message: 'Usuario no encontrado'});
      return;
    }
    
    res.status(200).json({
      message: `Usuario ${usuarioActualizado.nombre} actualizado exitosamente`,
      usuario: usuarioActualizado
    })
    
  } catch(error){
    console.error("Error al actualizar usuario", error);
    res.status(500).json({message: 'Error a la hora de actualizar el usuario '});
  }


}

export const eliminarUsuario = async (req: Request, res: Response): Promise<void> => {
  try{
    const {id} = req.params;

    if(!id){
      res.status(400).json({message: 'No se envio el id del usuario'});
      return;
    }

    const usuarioEliminado = await AuthRepository.eliminarUsuario(id as string);

    if(!usuarioEliminado){
      res.status(404).json({message: 'Usuario no encontrado'});
      return;
    }

    res.status(200).json({
      message: `Usuario ${usuarioEliminado.nombre} eliminado exitosamente`,
      usuario: usuarioEliminado
    })

  }catch(error){
    console.error("Error al eliminar usuario", error);
    res.status(500).json({message: 'Error a la hora de eliminar el usuario '});
  }
}

export const obtenerUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await AuthRepository.obtenerTodos();
    res.status(200).json({
      message: 'Usuarios obtenidos exitosamente',
      usuarios: usuarios
    });
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    res.status(500).json({message: 'Error a la hora de obtener los usuarios '});
  }
}

export const obtenerUsuarioPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    if(!id){
      res.status(400).json({message: 'No se envio el id del usuario'});
      return;
    }

    const usuario = await AuthRepository.obtenerPorId(id as string);

    if(!usuario){
      res.status(404).json({message: 'Usuario no encontrado'});
      return;
    }

    res.status(200).json({
      message: `Usuario ${usuario.nombre} obtenido exitosamente`,
      usuario: usuario
    });
  } catch (error) {
    console.error("Error al obtener usuario", error);
    res.status(500).json({message: 'Error a la hora de obtener el usuario '});
  }
}
