const jwt = require('jsonwebtoken');
const {
    Admin
} = require('../models/model');


const auth = async (req, res, next) => {

    try {
        // Get jwtoken and verify it 
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find out who is the admin
        const admin = await Admin.findOne({
            where: {
                id: decoded.id
            }
        });

        req.admin = admin;

        next();
    } catch (err) {
        res.status(401).send("Please login first!");
    }
}

module.exports = auth;