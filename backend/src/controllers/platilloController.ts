import { Request, Response } from "express";
import { PlatilloRepository } from "../repositories/platilloRepository";

export const crearPlatillo = async (req: Request, res: Response): Promise<void> => {
  try{

    // extraemos los datos del body
    const {nombre, descripcion, precio} = req.body;

    //llamamos a la funcion del repository
    const nuevoPlatilloId = await PlatilloRepository.crearP(nombre, descripcion, precio);

    //enviamos la respuesta
    
    res.status(201).json({
      message: `platillo creado exitosamente`,
      id: nuevoPlatilloId
    });



  }catch(e){
    console.error("Error al crear el platillo", e);
    res.status(500).json({message: 'Error interno del servidor'});
  }
};