const Group = require('../models/groupModel');

exports.createGroup = async (req, res) => {
  try {
    const { start_year, group_number, group_name } = req.body;

    if (!start_year || !group_number) {
      return res.status(400).json({ message: 'start_year i group_number są wymagane' });
    }

    const group = await Group.create({ start_year, group_number, group_name });
    return res.status(201).json(group);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas tworzenia grupy' });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    return res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd podczas pobierania grup' });
  }
};

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

exports.updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { start_year, group_number, group_name } = req.body;

    const group = await Group.findByPk(id);
    if (!group) {
      return res.status(404).json({ message: 'Grupa nie znaleziona' });
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
