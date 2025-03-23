const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Rejestracja użytkownika
 *     tags: 
 *       - Authorization
 *     description: Tworzy nowego użytkownika w systemie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Jan
 *               last_name:
 *                 type: string
 *                 example: Kowalski
 *               email:
 *                 type: string
 *                 example: jan.kowalski@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *               confirmPassword:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: Użytkownik zarejestrowany pomyślnie
 *       400:
 *         description: Błąd walidacji lub użytkownik już istnieje
 */
router.post('/register', registerController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Logowanie użytkownika
 *     tags: 
 *       - Authorization
 *     description: Loguje użytkownika i zwraca token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jan.kowalski@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Logowanie udane, zwraca token JWT
 *       400:
 *         description: Nieprawidłowy email lub hasło
 */
router.post('/login', loginController.loginUser);

module.exports = router;