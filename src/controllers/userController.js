const { User } = require('../models');

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
