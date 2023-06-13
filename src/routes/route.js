const express = require('express');
const router = express.Router();
const {createCollege , getCollegeWithInterns} = require('../controllers/collegeController');
const {createIntern} = require('../controllers/internController');


router.post('/functionup/colleges' , createCollege)

router.post('/functionup/interns' , createIntern)

router.get('/functionup/collegeDetails' , getCollegeWithInterns);


module.exports = router;