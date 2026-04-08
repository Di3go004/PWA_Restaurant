import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import platilloRoutes from './routes/platilloRoutes';
import authRoutes from './routes/authRoutes';
import { testConnection } from './db/db'

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Body parser para JSON



// Ruta de prueba
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ message: 'Servidor del Restaurante Funcionando Correctamente' });
});

// rutas de la api
app.use('/api/auth', authRoutes);
app.use('/api/platillos', platilloRoutes);

testConnection();

// Inicialización del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
