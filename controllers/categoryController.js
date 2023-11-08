const categoryModel = require("../models/categoryModel");
const path = require("path");
const fs = require("fs");
const bcryptjs = require('bcryptjs');

const config = require("../config/config");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const randomstring = require("randomstring");
const otpGenerator = require('otp-generator');



const create_token = async (id) => {

    try {

        const token = await jwt.sign({ _id: id }, config.secret_jwt);
        return token;

    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const securePassword = async (password) => {
    try {
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash;
    }
    catch (error) {

        res.status(400).send(error.message);

    }
}

const register_category = async (req, res) => {


    try {

        const users = new categoryModel({
            category: req.body.category
            
        });

        const userData = await categoryModel.findOne({ category: req.body.category });
        if (userData) {
            res.status(200).send({ success: false, msg: "This category is already exist" });

        }
        else {
            const user_data = await users.save();
            res.status(200).send({ success: true, data: user_data });
        }

    }

    catch (error) {


        res.status(400).send(error.message);
    }
}


const getcatogary = async (req, res) => {
    try {

        const data = await categoryModel.find();
        const formattedData = data.map(item => ({

            id: item._id,
            category: item.category

        }));

        // Send the formatted data as the response
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {

    register_category,
    getcatogary


}