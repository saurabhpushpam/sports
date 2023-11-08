const adminmodel = require("../models/adminModel");
const categorymodel = require("../models/categoryModel");
const path = require("path");
const fs = require("fs");
const bcryptjs= require('bcryptjs');

const config= require("../config/config");

const jwt= require("jsonwebtoken");

const nodemailer= require("nodemailer");

const randomstring= require("randomstring");




// get all data
const getdetail = async (req, res) => {

    try {

        const data = await adminmodel.find();
        const formattedData = data.map(item => ({

            id: item._id,
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,           
            category: item.category,
            images: item.images
          
         //   imagePath: path.join(__dirname, '..', 'public/productImages', item.images) // Construct complete local image path

        }));

        // Send the formatted data as the response
        res.status(200).json(formattedData);


        //  res.status(200).send({success: true, msg: "All details :", data: data});

    } catch (error) {
        res.status(400).send(error.message);
    }

}


// get data by id
const getdetailbyid = async (req, res) => {
    try {

        //const id= req.body.id;
        const id = req.params.id;

        const data = await adminmodel.findOne({ _id: id });

        if (data) {
            res.status(200).send({ success: true, msg: "product details :", data: { data } });

        } else {
            res.status(200).send({ success: false, msg: "id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}


// insert data
const insertproduct = async (req, res) => {

    try {
        var arrimages= [];
        for(let i=0; i<req.files.length; i++){

            arrimages[i]= req.files[i].filename;

        }
        

        const getdata = new adminmodel({
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            category: req.body.category,
           // images: req.file.filename
           images: arrimages
           
        });
        const product_data = await getdata.save();

        res.status(200).send({ success: true, msg: "product Details", data: product_data })

    }

    catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


// update data
const updateproduct = async (req, res) => {
    try {

        var arrimages= [];
        for(let i=0; i<req.files.length; i++){

            arrimages[i]= req.files[i].filename;

        }
        const id = req.body.id;
        const title = req.body.title;
        const subtitle = req.body.subtitle;
        const description = req.body.description;
        const category = req.body.category;
        const images = arrimages;

        const data = await adminmodel.findOne({ _id: id });

        if (data) {

            const userData = await adminmodel.findByIdAndUpdate({ _id: id }, {
                $set: {
                    title: title,subtitle: subtitle,category: category, description: description, images: images
                }
            });

            res.status(200).send({ success: true, msg: "your data has been updated" });

        } else {
            res.status(200).send({ success: false, msg: "id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}


// delete data
const deleteproduct = async (req, res) => {
    try {

        // const id= req.body.id;
        const id = req.params.id;


        const data = await adminmodel.findOne({ _id: id });

        if (data) {

            const userData = await adminmodel.deleteOne({ _id: id });

            res.status(200).send({ success: true, msg: "your data has been deleted" });

        } else {
            res.status(200).send({ success: false, msg: "id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}


// get image by imagename

const getimage = async (req, res) => {
    try {

        const image = req.params.image;


        const getImagePath = (imageName) => {
            // Construct the path to the image in the 'public/images' directory
            const imagePath = path.join(__dirname, '..', 'public', 'productImages', imageName);
            return imagePath;
        };

        const imageName = image;
        const imagePath = getImagePath(imageName);
        res.sendFile(imagePath);


    } catch (error) {
        res.status(400).send(error.message);
    }
}





module.exports = {
    getdetail,
    getdetailbyid,
    insertproduct,
    updateproduct,
    deleteproduct,
    getimage

}