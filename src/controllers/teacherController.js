const Teacher = require('../models/teacherModel');

exports.createTeacher = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Pole name jest wymagane' });
    }

    const teacher = await Teacher.create({ name });
    return res.status(201).json(teacher);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas tworzenia nauczyciela' });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    return res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas pobierania nauczycieli' });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      return res.status(404).json({ message: 'Nauczyciel nie znaleziony' });
    }

    return res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas pobierania nauczyciela' });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ message: 'Nauczyciel nie znaleziony' });
    }

    teacher.name = name || teacher.name;
    await teacher.save();

    return res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas aktualizacji nauczyciela' });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      return res.status(404).json({ message: 'Nauczyciel nie znaleziony' });
    }

    await teacher.destroy();
    return res.status(200).json({ message: 'Nauczyciel usunięty pomyślnie' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas usuwania nauczyciela' });
  }
};
