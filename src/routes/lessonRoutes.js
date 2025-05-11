const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const authorizeRole = require('../middlewares/authorizeRole');

/**
 * @swagger
 * /api/lessons:
 *   post:
 *     summary: Tworzy nowe zajęcia
 *     tags:
 *       - Lessons
 *     description: Tworzy nowe zajęcia na podstawie przesłanych danych
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - start
 *               - end
 *               - frequency
 *               - term
 *             properties:
 *               room:
 *                 type: string
 *                 example: A101
 *               title:
 *                 type: string
 *                 example: Matematyka
 *               start:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-05-01T10:00:00Z
 *               end:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-05-01T11:30:00Z
 *               teacher_id:
 *                 type: integer
 *                 example: 1
 *               lesson_type_id:
 *                 type: integer
 *                 example: 2
 *               group_id:
 *                 type: integer
 *                 example: 3
 *               frequency:
 *                 type: string
 *                 enum: [weekly, bi-weekly]
 *                 example: weekly
 *               term:
 *                 type: string
 *                 enum: [winter, summer]
 *                 example: winter
 *     responses:
 *       201:
 *         description: Zajęcia zostały utworzone pomyślnie
 *       400:
 *         description: Błąd walidacji danych
 */
router.post('/', authorizeRole, lessonController.createLesson);

/**
 * @swagger
 * /api/lessons:
 *   get:
 *     summary: Pobiera wszystkie zajęcia
 *     tags:
 *       - Lessons
 *     responses:
 *       200:
 *         description: Lista wszystkich zajęć
 *       500:
 *         description: Błąd serwera
 */
router.get('/', lessonController.getAllLessons);

/**
 * @swagger
 * /api/lessons/{id}:
 *   get:
 *     summary: Pobiera konkretne zajęcia po ID
 *     tags:
 *       - Lessons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID zajęć
 *     responses:
 *       200:
 *         description: Szczegóły zajęć
 *       404:
 *         description: Zajęcia nie zostały znalezione
 */
router.get('/:id', lessonController.getLessonById);

/**
 * @swagger
 * /api/lessons/{id}:
 *   put:
 *     summary: Aktualizuje istniejące zajęcia
 *     tags:
 *       - Lessons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID zajęć do aktualizacji
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room:
 *                 type: string
 *                 example: B202
 *               title:
 *                 type: string
 *                 example: Chemia
 *               start:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-05-01T12:00:00Z
 *               end:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-05-01T13:30:00Z
 *               teacher_id:
 *                 type: integer
 *                 example: 2
 *               lesson_type_id:
 *                 type: integer
 *                 example: 3
 *               group_id:
 *                 type: integer
 *                 example: 4
 *               frequency:
 *                 type: string
 *                 enum: [weekly, bi-weekly]
 *                 example: weekly
 *               term:
 *                 type: string
 *                 enum: [winter, summer]
 *                 example: winter
 *     responses:
 *       200:
 *         description: Zajęcia zaktualizowane
 *       404:
 *         description: Zajęcia nie zostały znalezione
 */
router.put('/:id', lessonController.updateLesson);

/**
 * @swagger
 * /api/lessons/{id}:
 *   delete:
 *     summary: Usuwa zajęcia
 *     tags:
 *       - Lessons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID zajęć do usunięcia
 *     responses:
 *       200:
 *         description: Zajęcia usunięte pomyślnie
 *       404:
 *         description: Zajęcia nie zostały znalezione
 */
router.delete('/:id', lessonController.deleteLesson);

/**
 * @swagger
 * /api/lessons/date/{date}/group/{group_id}:
 *   get:
 *     summary: Pobierz lekcje dla grupy w danym dniu
 *     tags:
 *       - Lessons
 *     description: Zwraca lekcje przypisane do grupy na określony dzień.
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         description: Data, dla której chcesz pobrać lekcje (w formacie YYYY-MM-DD)
 *         schema:
 *           type: string
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: ID grupy, dla której chcesz pobrać lekcje
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista lekcji dla danej grupy w danym dniu
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   room:
 *                     type: string
 *                   title:
 *                     type: string
 *                   start:
 *                     type: string
 *                     format: date-time
 *                   end:
 *                     type: string
 *                     format: date-time
 *                   teacher_id:
 *                     type: integer
 *                   lesson_type_id:
 *                     type: integer
 *                   group_id:
 *                     type: integer
 *                   frequency:
 *                     type: string
 *                   term:
 *                     type: string
 *       404:
 *         description: Brak lekcji dla danej grupy w danym dniu
 *       400:
 *         description: Niepoprawny format daty
 *       500:
 *         description: Błąd serwera
 */
router.get('/date/:date/group/:group_id', lessonController.getLessonsByDateAndGroup);

module.exports = router;