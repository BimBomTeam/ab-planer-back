const Lesson = require('../models/lessonModel'); // Zakładam że masz już Lesson model
const Group = require('../models/groupModel'); // Zakładam że masz już Group model
// Create a new lesson
exports.createLesson = async (req, res) => {
  const { room, title, start, end, teacher_id, lesson_type_id, group_id } = req.body;

  try {
    if (!title || !start || !end) {
      return res.status(400).json({ message: 'Tytuł, data rozpoczęcia i zakończenia są wymagane' });
    }

    const lesson = await Lesson.create({
      room,
      title,
      start,
      end,
      teacher_id,
      lesson_type_id,
      group_id
    });

    return res.status(201).json({
      message: 'Zajęcia zostały utworzone pomyślnie',
      lesson
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd podczas tworzenia zajęć' });
  }
};

// Get all lessons
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll();
    return res.status(200).json(lessons);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd podczas pobierania zajęć' });
  }
};

// Get single lesson by ID
exports.getLessonById = async (req, res) => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      return res.status(404).json({ message: 'Zajęcia nie zostały znalezione' });
    }

    return res.status(200).json(lesson);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd podczas pobierania zajęć' });
  }
};

// Update a lesson
exports.updateLesson = async (req, res) => {
  const { id } = req.params;
  const { room, title, start, end, teacher_id, lesson_type_id, group_id } = req.body;

  try {
    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      return res.status(404).json({ message: 'Zajęcia nie zostały znalezione' });
    }

    await lesson.update({
      room,
      title,
      start,
      end,
      teacher_id,
      lesson_type_id,
      group_id
    });

    return res.status(200).json({ message: 'Zajęcia zostały zaktualizowane', lesson });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd podczas aktualizacji zajęć' });
  }
};

// Delete a lesson
exports.deleteLesson = async (req, res) => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      return res.status(404).json({ message: 'Zajęcia nie zostały znalezione' });
    }

    await lesson.destroy();

    return res.status(200).json({ message: 'Zajęcia zostały usunięte' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd podczas usuwania zajęć' });
  }
};

exports.getLessonsForGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findByPk(id);
    if (!group) {
      return res.status(404).json({ message: 'Grupa nie znaleziona' });
    }

    const lessons = await Lesson.findAll({
      where: { group_id: id }
    });

    return res.status(200).json(lessons);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas pobierania zajęć dla grupy' });
  }
};