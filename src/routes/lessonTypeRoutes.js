const express = require('express');
const router = express.Router();
const lessonTypeController = require('../controllers/lessonTypeController');

/**
 * @swagger
 * /api/lesson-types:
 *   post:
 *     summary: Tworzy nowy typ zajęć
 *     tags: [LessonTypes]
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
 *                 example: Wykład
 *     responses:
 *       201:
 *         description: Utworzono typ zajęć
 *       400:
 *         description: Błąd walidacji
 */
router.post('/', lessonTypeController.createLessonType);

/**
 * @swagger
 * /api/lesson-types:
 *   get:
 *     summary: Pobiera wszystkie typy zajęć
 *     tags: [LessonTypes]
 *     responses:
 *       200:
 *         description: Lista typów zajęć
 */
router.get('/', lessonTypeController.getAllLessonTypes);

/**
 * @swagger
 * /api/lesson-types/{id}:
 *   get:
 *     summary: Pobiera typ zajęć po ID
 *     tags: [LessonTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dane typu zajęć
 *       404:
 *         description: Typ zajęć nie znaleziony
 */
router.get('/:id', lessonTypeController.getLessonTypeById);

/**
 * @swagger
 * /api/lesson-types/{id}:
 *   put:
 *     summary: Aktualizuje typ zajęć
 *     tags: [LessonTypes]
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
 *                 example: Ćwiczenia
 *     responses:
 *       200:
 *         description: Zaktualizowano typ zajęć
 *       404:
 *         description: Typ zajęć nie znaleziony
 */
router.put('/:id', lessonTypeController.updateLessonType);

/**
 * @swagger
 * /api/lesson-types/{id}:
 *   delete:
 *     summary: Usuwa typ zajęć
 *     tags: [LessonTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usunięto typ zajęć
 *       404:
 *         description: Typ zajęć nie znaleziony
 */
router.delete('/:id', lessonTypeController.deleteLessonType);

module.exports = router;
