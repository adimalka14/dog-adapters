import path from 'path';
import { PORT } from '../utils/env-var';
import { swaggerSchemas } from '../models/swaggerSchemas';

export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Dog adopters - API Documentation',
            version: '1.0.0',
            description: 'This is the API documentation for our project - Dog adopters.',
        },
        tags: [
            {
                name: 'Main Page',
                description: 'Endpoints related to Main Page',
            },
            {
                name: 'Authentication',
                description: 'Endpoints related to user authentication and registration',
            },
            {
                name: 'Dogs CRUD',
                description: 'Endpoints for managing dogs',
            },
            {
                name: 'Users CRUD',
                description: 'Endpoints for managing users',
            },
        ],
        components: {
            schemas: swaggerSchemas,
        },
        servers: [
            {
                url: `http://localhost:${PORT}`, // Update this to your server's URL
                description: 'Development server',
            },
        ],
    },
    apis: [path.join(__dirname, '../routes/*.ts')], // Update the path if your routes are in a different folder
};
