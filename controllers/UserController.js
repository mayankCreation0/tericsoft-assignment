const UserModel = require('../models/UserModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BmiModel = require('../models/BmiModel');
require("dotenv").config();

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({
            email: email,
        });
        if (existingUser) {
            return res.status(400).json("User Already Registered");
        }
        const hashedPassword = await bcrypt.hash(password, 11);
        await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        return res.status(201).json("Registeration successful");
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "something went wrong" });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.SECRET_KEY
        );
        return res.status(200).json({ user: existingUser, token: token });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Something went wrong" });
    }
};
const getDetails = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const existingUser = await UserModel.findById(id);
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ user: existingUser });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Something went wrong" });
    }
};

const getUserHistory = async (req, res) => {
    try {
        const user = req.userid;
        console.log("hids",user)
        const calculations = await BmiModel.find({ user:user });
        return res.json({ calculations });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    login,
    register,
    getDetails, getUserHistory
};