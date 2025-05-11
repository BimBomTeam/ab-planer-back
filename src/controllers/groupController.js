const Group = require('../models/groupModel');
const Major = require('../models/majorModel');
// Tworzenie nowej grupy
exports.createGroup = async (req, res) => {
  try {
    const { start_year, group_number, group_name } = req.body;

    if (!start_year || !group_number) {
      return res.status(400).json({ message: 'start_year i group_number są wymagane' });
    }

    if (typeof start_year !== 'string') {
      return res.status(400).json({ message: 'start_year musi być typu string' });
    }

    const group = await Group.create({ start_year, group_number, group_name });
    return res.status(201).json(group);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas tworzenia grupy' });
  }
};

// Pobieranie wszystkich grup
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: [
        {
          model: Major,
          attributes: ['name'],
        },
      ],
    });
    return res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas pobierania grup' });
  }
};

// Pobieranie jednej grupy po ID
exports.getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findByPk(id);

    if (!group) {
      return res.status(404).json({ message: 'Grupa nie znaleziona' });
    }

    return res.status(200).json(group);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas pobierania grupy' });
  }
};

// Aktualizacja grupy
exports.updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { start_year, group_number, group_name } = req.body;

    const group = await Group.findByPk(id);
    if (!group) {
      return res.status(404).json({ message: 'Grupa nie znaleziona' });
    }

    if (start_year !== undefined && typeof start_year !== 'string') {
      return res.status(400).json({ message: 'start_year musi być typu string' });
    }

    group.start_year = start_year ?? group.start_year;
    group.group_number = group_number ?? group.group_number;
    group.group_name = group_name ?? group.group_name;
    await group.save();

    return res.status(200).json(group);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas aktualizacji grupy' });
  }
};

// Usuwanie grupy
exports.deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findByPk(id);

    if (!group) {
      return res.status(404).json({ message: 'Grupa nie znaleziona' });
    }

    await group.destroy();
    return res.status(200).json({ message: 'Grupa usunięta pomyślnie' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas usuwania grupy' });
  }
};

// Pobieranie grup po start_year
exports.getGroupsByStartYear = async (req, res) => {
  try {
    const { start_year } = req.params;

    if (!start_year || typeof start_year !== 'string') {
      return res.status(400).json({ message: 'start_year musi być typu string' });
    }

    const groups = await Group.findAll({
      where: { start_year }
    });

    if (groups.length === 0) {
      return res.status(404).json({ message: 'Brak grup dla podanego rocznika' });
    }

    return res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas pobierania grup' });
  }
};