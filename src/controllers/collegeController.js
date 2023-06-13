const { status } = require('express/lib/response');
const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const {isValid ,isValidString, validString} = require('../utils/validation')



//------------------------------------ API to create a college -------------------------------------------
const createCollege = async function (req, res) {
    try {
        const collegeData = req.body;
        //destructuring req body
        const { name, fullName, logoLink } = collegeData;

        //validating if req body is empty 
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "pls provide college detailes" });
        if (!name || !fullName || !logoLink) return res.status(400).send({ status: false, message: "either name fullName or logoLink is missing" });

        // validating if the required fields are valid or not
        if (!isValid(name)) return res.status(400).send({ status: false, message: "name is not valid" });
        if (!isValid(fullName)) return res.status(400).send({ status: false, message: "fullName is not valid" });
        if (!isValidString(name)) return res.status(400).send({ status: false, message: "name is not valid string" });
        if (validString(fullName)) return res.status(400).send({ status: false, message: "fullName is not valid string" });
        if (typeof logoLink !== 'string') return res.status(400).send({ status: false, message: "logoLink is not valid" });

        // check if collegeName is unique or not
        const isUniqueName = await collegeModel.findOne({ name: name, isDeleted: false });
        if (isUniqueName) {
            return res.status(400).send({
                status: false,
                message: "college with this name is already present"
            })
        };

        // save a college in db
        const saveCollege = await collegeModel.create(collegeData);

        let response = {
            name: saveCollege.name,
            fullName: saveCollege.fullName,
            logoLink: saveCollege.logoLink,
            isDeleted: saveCollege.isDeleted
        }

        return res.status(201).send({ status: true, data: response });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

};




//---------------------------------- API to get college details with all its interns--------------------------
const getCollegeWithInterns = async function (req, res) {
    try {
        const collegeName = req.query.collegeName;
        //validating if req body is empty 
        if (Object.keys(req.query).length == 0) return res.status(400).send({ status: false, message: "pls provide collegeName in query" })
        if (!isValid(collegeName)) return res.status(400).send({ status: false, message: "collegeName is not valid" });

        // find college with the collegeName
        const college = await collegeModel.findOne({ name: collegeName, isDeleted: false });
        if (!college) {
            return res.status(404).send({
                status: false,
                message: "college not found"
            })
        };

        const collegeId = college._id;

        // find all interns having above collegeId
        const interns = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ collegeId: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 });
        if (!interns) {
            return res.status(404).send({
                status: false,
                message: "No interns in this college"
            })
        };

        // mearge college with all the interns in that college
        const collegeWithAllInterns = {
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink,
            interns: interns
        };

        return res.status(200).send({ status: true, data: collegeWithAllInterns });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports.createCollege = createCollege;
module.exports.getCollegeWithInterns = getCollegeWithInterns;


