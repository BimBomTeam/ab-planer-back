const LessonType = require('../models/lessonTypeModel');

exports.createLessonType = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Pole name jest wymagane' });
    }

    const lessonType = await LessonType.create({ name });
    return res.status(201).json(lessonType);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas tworzenia typu zajęć' });
  }
};

exports.getAllLessonTypes = async (req, res) => {
  try {
    const lessonTypes = await LessonType.findAll();
    return res.status(200).json(lessonTypes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas pobierania typów zajęć' });
  }
};

exports.getLessonTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const lessonType = await LessonType.findByPk(id);

    if (!lessonType) {
      return res.status(404).json({ message: 'Typ zajęć nie znaleziony' });
    }

    return res.status(200).json(lessonType);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas pobierania typu zajęć' });
  }
};

exports.updateLessonType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const lessonType = await LessonType.findByPk(id);
    if (!lessonType) {
      return res.status(404).json({ message: 'Typ zajęć nie znaleziony' });
    }

    lessonType.name = name || lessonType.name;
    await lessonType.save();

    return res.status(200).json(lessonType);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas aktualizacji typu zajęć' });
  }
};

exports.deleteLessonType = async (req, res) => {
  try {
    const { id } = req.params;
    const lessonType = await LessonType.findByPk(id);

    if (!lessonType) {
      return res.status(404).json({ message: 'Typ zajęć nie znaleziony' });
    }

    await lessonType.destroy();
    return res.status(200).json({ message: 'Typ zajęć usunięty pomyślnie' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas usuwania typu zajęć' });
  }
};
