const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const verifyEmailController = require('../controllers/verifyEmailController');

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

/**
 * @swagger
 * /api/users/verify/{token}:
 *   get:
 *     summary: Weryfikacja e-maila użytkownika
 *     tags: 
 *       - Authorization
 *     description: Weryfikuje e-mail użytkownika na podstawie tokena
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token weryfikacyjny wysłany w e-mailu
 *         schema:
 *           type: string
 *           example: abc123token
 *     responses:
 *       200:
 *         description: Konto zostało zweryfikowane pomyślnie
 *       400:
 *         description: Błąd weryfikacji lub nieprawidłowy token
 */
router.get('/verify/:token', verifyEmailController.verifyEmail);

module.exports = router;