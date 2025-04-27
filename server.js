const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const lessonRoutes = require('./src/routes/lessonRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const lessonTypeRoutes = require('./src/routes/lessonTypeRoutes');
const groupRoutes = require('./src/routes/groupRoutes');
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
        tags: [
            {
                name: 'Authorization',
                description: 'Endpointy odpowiedzialne za rejestrację i logowanie użytkowników',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/lesson-types', lessonTypeRoutes);
app.use('/api/groups', groupRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger UI available at: ${config.development.BASE_URL}/api-docs`);
});