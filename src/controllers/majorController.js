const Major = require('../models/majorModel');

// Create a new major
exports.createMajor = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Nazwa majoru jest wymagana' });
    }

    const major = await Major.create({ name });
    return res.status(201).json({
      message: 'Major został utworzony pomyślnie',
      major
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas tworzenia majoru' });
  }
};

// Get all majors
exports.getAllMajors = async (req, res) => {
  try {
    const majors = await Major.findAll();
    return res.status(200).json(majors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas pobierania majorów' });
  }
};

// Get a major by ID
exports.getMajorById = async (req, res) => {
  try {
    const { id } = req.params;
    const major = await Major.findByPk(id);

    if (!major) {
      return res.status(404).json({ message: 'Major nie został znaleziony' });
    }

    return res.status(200).json(major);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas pobierania majoru' });
  }
};

// Update a major
exports.updateMajor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const major = await Major.findByPk(id);

    if (!major) {
      return res.status(404).json({ message: 'Major nie został znaleziony' });
    }

    major.name = name ?? major.name; // Jeśli nie ma nazwy, zachowaj starą
    await major.save();

    return res.status(200).json({
      message: 'Major został zaktualizowany',
      major
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas aktualizacji majoru' });
  }
};

// Delete a major
exports.deleteMajor = async (req, res) => {
  try {
    const { id } = req.params;
    const major = await Major.findByPk(id);

    if (!major) {
      return res.status(404).json({ message: 'Major nie został znaleziony' });
    }

    await major.destroy();
    return res.status(200).json({ message: 'Major został usunięty' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas usuwania majoru' });
  }
};
