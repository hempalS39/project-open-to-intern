const internModel = require('../models/internModel');
const collegeModel = require('../models/collegeModel');
const {isValid ,isValidString, validString , validateEmail , validateMobile} = require('../utils/validation')



const createIntern = async function (req , res) {
    try {
        const data = req.body;
 
    const {name , email , mobile , collegeName } = data;

    if(Object.keys(data).length==0) return res.status(400).send({status:false , message:"pls provide Intern details"});
    if(!name) return res.status(400).send({status : false , message : "name is missing"});
    if(!email) return res.status(400).send({status : false , message : "email is missing"});
    if(!mobile) return res.status(400).send({status : false , message : "mobile is missing"});
    if(!collegeName) return res.status(400).send({status : false , message : "collegeName is missing"});

    if(!isValid(name)) return res.status(400).send({status:false , message : "name is not valid"});
    // if(!isValidString(name)) return res.status(400).send({status:false , message : "name is not valid string"});
    if(!isValidString(collegeName)) return res.status(400).send({status:false , message : "collegeName is not valid string"});
    if(typeof email == 'number') return res.status(400).send({status : false , message : "email  not valid"});
    // if(!validateEmail(email)) return res.status(400).send({status : false , message : "email is not valid"});
    if(!validateMobile(mobile)) return res.status(400).send({status : false , message : "mobile is not valid"});
    if(mobile.length !== 10) return res.status(400).send({status : false , message : "mobile should be of length 10"})
    //check if email is unique
    const isUniqueEmail = await internModel.findOne({email : email ,isDeleted : false});
    if(isUniqueEmail){
        return res.status(400).send({
            status : false,
            message : "email is already present, pls provide unique email"
        })
    };
    //check if mobile is unique
    const isUniqueMobile = await internModel.findOne({mobile : mobile , isDeleted : false});
    if(isUniqueMobile){
        return res.status(400).send({
            status : false,
            message : "mobile is already present, pls provide unique mobile"
        })
    };
    //check is college is exist 
    const collegeId = await collegeModel.findOne({name : collegeName , isDeleted : false});
    if(!collegeId){
        return res.status(404).send({
            status : false,
            message : "no college found with this collegeName"
        })
    };
    // delete collegeName and save collegeId in data
    delete data.collegeName;
    data.collegeId = collegeId._id;

    const saveIntern = await internModel.create(data);

    let response = {
        name : saveIntern.name ,
        email : saveIntern.email,
        mobile : saveIntern.mobile,
        collegeId : saveIntern.collegeId,
        isDeleted : saveIntern.isDeleted
     };

    return res.status(201).send({status : true , data : response});
    } 
    catch (error) {
        return res.status(500).send({status : false , message : error.message});
    }
};


module.exports.createIntern = createIntern;

