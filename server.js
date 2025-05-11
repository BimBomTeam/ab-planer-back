const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const lessonRoutes = require('./src/routes/lessonRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const lessonTypeRoutes = require('./src/routes/lessonTypeRoutes');
const groupRoutes = require('./src/routes/groupRoutes');
const majorRoutes = require('./src/routes/majorRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config/config.json');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Konfiguracja Swaggera
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'Test API',
        },
        servers: [
            {
                url: config.development.BASE_URL,
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
        tags: [
            {
                name: 'Authorization',
                description: 'Endpointy odpowiedzialne za rejestrację i logowanie użytkowników',
            },
            {
                name: 'Groups',
                description: 'Endpointy odpowiedzialne za zarządzanie grupami',
            },
            {
                name: 'Lessons',
                description: 'Endpointy odpowiedzialne za zarządzanie lekcjami',
            },
            {
                name: 'LessonTypes',
                description: 'Endpointy odpowiedzialne za zarządzanie typami lekcji',
            },
            {
                name: 'Majors',
                description: 'Endpointy odpowiedzialne za zarządzanie kierunkami studiów',
            },
            {
                name: 'Teachers',
                description: 'Endpointy odpowiedzialne za zarządzanie nauczycielami',
            },
        {
                name: 'Users',
                description: 'Endpointy odpowiedzialne za zarządzanie użytkownikami',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const options = {
    swaggerOptions: {
        docExpansion: 'none'
    }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));

app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/lesson-types', lessonTypeRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/majors', majorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger UI available at: ${config.development.BASE_URL}/api-docs`);
});