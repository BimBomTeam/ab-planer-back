const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Tworzy nowego nauczyciela
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Adam Kowalski
 *     responses:
 *       201:
 *         description: Utworzono nauczyciela
 *       400:
 *         description: Błąd walidacji
 */
router.post('/', teacherController.createTeacher);

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Pobiera wszystkich nauczycieli
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Lista nauczycieli
 */
router.get('/', teacherController.getAllTeachers);

/**
 * @swagger
 * /api/teachers/{id}:
 *   get:
 *     summary: Pobiera nauczyciela po ID
 *     tags: [Teachers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dane nauczyciela
 *       404:
 *         description: Nauczyciel nie znaleziony
 */
router.get('/:id', teacherController.getTeacherById);

/**
 * @swagger
 * /api/teachers/{id}:
 *   put:
 *     summary: Aktualizuje nauczyciela
 *     tags: [Teachers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
 *                 example: Adam Nowak
 *     responses:
 *       200:
 *         description: Zaktualizowano nauczyciela
 *       404:
 *         description: Nauczyciel nie znaleziony
 */
router.put('/:id', teacherController.updateTeacher);

/**
 * @swagger
 * /api/teachers/{id}:
 *   delete:
 *     summary: Usuwa nauczyciela
 *     tags: [Teachers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usunięto nauczyciela
 *       404:
 *         description: Nauczyciel nie znaleziony
 */
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
