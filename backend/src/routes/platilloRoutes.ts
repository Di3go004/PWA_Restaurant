import { Router } from "express";
import { crearPlatillo } from "../controllers/platilloController";
import { verificarToken, verificarRol } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  '/',
  verificarToken,
  verificarRol(['administrador']),
  crearPlatillo
);

export default router;
