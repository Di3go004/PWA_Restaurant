import { Router } from "express";
import { registrarUsuario, loginUsuario, actualizarUsuario, obtenerUsuarioPorId, obtenerUsuarios, eliminarUsuario} from "../controllers/authController";
import { verificarToken, verificarRol } from "../middlewares/authMiddleware";

const router = Router();

router.post('/register',verificarToken, verificarRol(['administrador']),registrarUsuario);
router.post('/login', loginUsuario);
router.put('/update/:id', verificarToken, verificarRol(['administrador']), actualizarUsuario);
router.get('/usuarios', verificarToken, verificarRol(['administrador']), obtenerUsuarios);
router.get('/usuarios/:id', verificarToken, verificarRol(['administrador']), obtenerUsuarioPorId);
router.delete('/usuarios/:id', verificarToken, verificarRol(['administrador']), eliminarUsuario);

export default router;