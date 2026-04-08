import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swaggerConfig';
import {testConnection } from './db/db'

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Body parser para JSON

// Documentación estática de Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta de prueba
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ message: 'Servidor del Restaurante Funcionando Correctamente' });
});

testConnection();

// Inicialización del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación (Swagger) disponible en http://localhost:${PORT}/api/docs`);
});
