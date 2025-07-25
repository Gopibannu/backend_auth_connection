const express = require('express');
const { signup,login } = require('../controllers/authControllers.js');
const router =  express.Router();
const {verifyToken,authorizeRole, authorizeRoles} = require('../middleware/authMiddleware.js')

router.post('/signup',signup);
router.post('/login',login);

router.get('/adminDasshboard',verifyToken,authorizeRoles('admin'),(req,res)=>{
    res.status(200).json({message:`Hello i Am Admin ${req.user.userId}`})
})

router.get('/userDasshboard',verifyToken,authorizeRoles('user'),(req,res)=>{
    res.status(200).json({message:`Hello i Am User ${req.user.userId}`})
})

module.exports = router