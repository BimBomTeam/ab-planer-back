const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Tworzy nową grupę
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_year
 *               - group_number
 *             properties:
 *               start_year:
 *                 type: string
 *                 example: 2023
 *               group_number:
 *                 type: integer
 *                 example: 1
 *               group_name:
 *                 type: string
 *                 example: Informatyka 1A
 *     responses:
 *       201:
 *         description: Grupa została utworzona
 *       400:
 *         description: Błąd walidacji
 */
router.post('/', groupController.createGroup);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Pobiera wszystkie grupy
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: Lista grup
 */
router.get('/', groupController.getAllGroups);

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Pobiera grupę po ID
 *     tags: [Groups]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dane grupy
 *       404:
 *         description: Grupa nie znaleziona
 */
router.get('/:id', groupController.getGroupById);

/**
 * @swagger
 * /api/groups/{id}:
 *   put:
 *     summary: Aktualizuje grupę
 *     tags: [Groups]
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
 *               start_year:
 *                 type: string
 *                 example: 2024
 *               group_number:
 *                 type: integer
 *                 example: 2
 *               group_name:
 *                 type: string
 *                 example: Informatyka 2B
 *     responses:
 *       200:
 *         description: Grupa zaktualizowana
 *       404:
 *         description: Grupa nie znaleziona
 */
router.put('/:id', groupController.updateGroup);

/**
 * @swagger
 * /api/groups/{id}:
 *   delete:
 *     summary: Usuwa grupę
 *     tags: [Groups]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Grupa usunięta
 *       404:
 *         description: Grupa nie znaleziona
 */
router.delete('/:id', groupController.deleteGroup);


/**
 * @swagger
 * /api/groups/start-year/{start_year}:
 *   get:
 *     summary: Pobierz grupy na podstawie rocznika
 *     tags:
 *       - Groups
 *     description: Zwraca listę grup, które zaczynają się w danym roczniku
 *     parameters:
 *       - in: path
 *         name: start_year
 *         required: true
 *         description: Rocznik, dla którego chcesz pobrać grupy
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista grup dla danego rocznika
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   group_number:
 *                     type: string
 *                   group_name:
 *                     type: string
 *                   start_year:
 *                     type: string
 *       400:
 *         description: Błąd - rocznik musi być liczbą
 *       404:
 *         description: Brak grup dla podanego rocznika
 *       500:
 *         description: Błąd serwera
 */
router.get('/start-year/:start_year', groupController.getGroupsByStartYear);

module.exports = router;
