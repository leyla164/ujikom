const model = require("../database/models/");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    model.User.findOne({
        where: {
            email: email,
        },
    }).then(function (result) {
        let passwordHash = result.password;
        let checkPassword = bcrypt.compareSync(password, passwordHash);

        if (checkPassword) {
            res.json({
                message: "Berhasil Login",
                token: jwt.sign({ id: result.id }, process.env.JWT_KEY_SECRET, {
                    expiresIn: '1h'
                }),
            });
        } else {
            res.json({
                message: "Gagal Login",
            });
        }
    }).catch(function (error) {
        res.json({ error: error });
    });
}

function register(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Check if the user already exists
    model.User.findOne({
        where: {
            email: email,
        },
    }).then(function (result) {
        // If the user already exists, return an error message
        if (result) {
            res.json({
                message: "User already exists. Registration failed.",
            });
        } else {
            // If the user does not exist, hash the password and create a new user
            const hashedPassword = bcrypt.hashSync(password, 10);

            model.User.create({
                name: name,
                email: email,
                password: hashedPassword,
            }).then(function (newUser) {
                res.json({
                    message: "Registration successful",
                    token: jwt.sign({ id: newUser.id }, process.env.JWT_KEY_SECRET, {
                        expiresIn: '1h'
                    }),
                    data: {
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                    }
                });
            }).catch(function (error) {
                res.json({ error: error });
            });
        }
    }).catch(function (error) {
        res.json({ error: error });
    });
}

function logout(req, res) {
    // logic logout disini

    res.json({
        message: "Logout successful",
    });
}

module.exports = {
    login, register, logout
}