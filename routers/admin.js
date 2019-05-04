const express = require("express");
const router = express.Router();

const {
    Admin
} = require("../models/model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("../middlewares/auth");


// Get the signup page
router.get("/signup", (req, res) => {
    res.render("signup");
});

// Get the login page
router.get("/login", (req, res) => {
    res.render("login");
});

// Admin signup
router.post("/signup", async (req, res) => {

    const admin = new Admin(req.body);

    try {
        await admin.save();
        res.status(201).redirect("/login");
    } catch (err) {
        res.status(400).send(err.errors[0].message);
    }
});

// Admin login
router.post("/login", async (req, res) => {
    try {
        // Find admin by account and check
        const admin = await Admin.findOne({
            where: {
                account: req.body.account
            }
        });
        if (!admin) {
            res.status(400).send('Account does not exist!')
        }

        // Validate the password
        const isMatch = await bcrypt.compare(req.body.password, admin.password);
        if (!isMatch) {
            res.status(400).send('Please check the password!')
        }

        // Generate Jsonwebtoken
        const generateJwtoken = () => {
            const token = jwt.sign({
                    id: admin.id,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
                },
                process.env.JWT_SECRET
            );
            return token;
        };

        // Set Jsonwebtoken as cookie
        res.cookie('access_token', generateJwtoken());

        res.redirect('member-list');
    } catch (err) {
        res.status(400).send(err.errors[0].message);
    }
});

// Admin logout
router.post("/logout", auth, async (req, res) => {
    try {
        res.cookie('access_token', '')
        res.redirect("login");
    } catch (err) {
        // Send 500 Internal server error to browser
        res.status(500).send(err.errors[0].message);
    }
});

module.exports = router;