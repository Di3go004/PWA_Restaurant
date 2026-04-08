import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PWA Restaurant API',
            version: '1.0.0',
            description: 'API Documentada con Swagger para el proyecto PWA Restaurant usando Express, PostgreSQL y JWT.',
            contact: {
                name: 'Desarrollador Junior',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Servidor de Desarrollo Local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    // Archivos donde buscaremos las anotaciones para la documentación
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Se actualizará al tener rutas
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
