const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const User = require('../models/userModel');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email i hasło są wymagane' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Błędny email lub hasło' });
    }

    // if (!user.is_verified) {
    //   return res.status(400).json({ message: 'Please verify your email' });
    // }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Błędny email lub hasło' });
    }

    const token = jwt.sign(
      { 
        email: user.email,
        first_name: user.first_name, 
        last_name: user.last_name 
      },
      config.development.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Logowanie przeszło pomyślnie',
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd logowania' });
  }
};