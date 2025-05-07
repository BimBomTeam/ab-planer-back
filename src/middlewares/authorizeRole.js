const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Brak tokena lub zły format' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, config.development.JWT_SECRET);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Dostęp tylko dla admina' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Nieprawidłowy token' });
    }
};
