const { User } = require('../models');
const Group = require('../models/groupModel');
const Major = require('../models/majorModel');

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, group_id } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony' });

    await user.update({ first_name, last_name, group_id });
    res.status(200).json({ message: 'Użytkownik zaktualizowany pomyślnie', user });
  } catch (error) {
    console.error('Błąd aktualizacji:', error);
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
};


exports.fetchUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'first_name', 'last_name', 'email', 'role'],
      include: {
        model: Group,
        attributes: ['group_number', 'group_name', 'start_year'],
        include: {
          model: Major,
          attributes: ['name'],
        }
      }
    });

    if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Błąd fetchUser:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};
