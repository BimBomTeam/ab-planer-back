const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../../config/config.json');

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, config.development.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(400).json({ message: 'Nieprawidłowy token' });
    }

    user.is_verified = true;
    await user.save();

    return res.status(200).json({ message: 'Konto zostało zweryfikowane. Możesz się teraz zalogować.' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Błąd weryfikacji' });
  }
};