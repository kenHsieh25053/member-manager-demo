const express = require("express");
const router = express.Router();
const {
    Member
} = require("../models/model");
const auth = require("../middlewares/auth");


// Get all members
router.get("/member-list", auth, async (req, res) => {
    try {
        const members = await Member.findAll({
            where: {
                adminId: req.admin.id
            }
        });

        res.render("member-list", {
            people: members
        });
    } catch (err) {
        res.status(500).send(err.errors[0].message);
    }
});

// Create a member
router.post("/member-list", auth, async (req, res) => {
    try {
        const member = await Member.create({
            ...req.body,
            adminId: req.admin.id
        });
        await member.save();
        res.redirect("member-list");
    } catch (err) {
        res.status(400).send(err.errors[0].message);
    }
});

// Ｕpdate a member
router.post("/member-update/:id", auth, async (req, res) => {

    try {
        await Member.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.redirect('/member-list')
    } catch (err) {
        res.status(500).send(err.errors[0].message);
    }
});

// Delete a member
router.post("/member-delete/:id", auth, async (req, res) => {
    try {
        const member = await Member.destroy({
            where: {
                adminId: req.admin.id,
                id: req.params.id
            }
        });

        if (!member) {
            res.status(404).send('Member not found!');
        }
        res.redirect("/member-list");
    } catch (err) {
        res.status(500).send(err.errors[0].message);
    }
});

module.exports = router;