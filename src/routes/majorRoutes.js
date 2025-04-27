const express = require('express');
const router = express.Router();
const majorController = require('../controllers/majorController');

// Create a new major (kierunek studiów)
/**
 * @swagger
 * /api/majors:
 *   post:
 *     summary: Tworzy nowy kierunek studiów
 *     tags:
 *       - Majors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Informatyka
 *     responses:
 *       201:
 *         description: Kierunek studiów został utworzony
 *       400:
 *         description: Błąd - nazwa kierunku studiów jest wymagana
 */
router.post('/', majorController.createMajor);

// Get all majors (kierunki studiów)
/**
 * @swagger
 * /api/majors:
 *   get:
 *     summary: Pobiera wszystkie kierunki studiów
 *     tags:
 *       - Majors
 *     responses:
 *       200:
 *         description: Lista kierunków studiów
 *       500:
 *         description: Błąd serwera
 */
router.get('/', majorController.getAllMajors);

// Get major by ID (kierunek studiów po ID)
/**
 * @swagger
 * /api/majors/{id}:
 *   get:
 *     summary: Pobiera kierunek studiów po ID
 *     tags:
 *       - Majors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID kierunku studiów
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kierunek studiów
 *       404:
 *         description: Kierunek studiów nie znaleziony
 */
router.get('/:id', majorController.getMajorById);

// Update a major (aktualizowanie kierunku studiów)
/**
 * @swagger
 * /api/majors/{id}:
 *   put:
 *     summary: Aktualizuje kierunek studiów
 *     tags:
 *       - Majors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID kierunku studiów do aktualizacji
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Matematyka
 *     responses:
 *       200:
 *         description: Kierunek studiów został zaktualizowany
 *       404:
 *         description: Kierunek studiów nie znaleziony
 */
router.put('/:id', majorController.updateMajor);

// Delete a major (usuwanie kierunku studiów)
/**
 * @swagger
 * /api/majors/{id}:
 *   delete:
 *     summary: Usuwa kierunek studiów
 *     tags:
 *       - Majors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID kierunku studiów do usunięcia
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kierunek studiów został usunięty
 *       404:
 *         description: Kierunek studiów nie znaleziony
 */
router.delete('/:id', majorController.deleteMajor);

module.exports = router;
