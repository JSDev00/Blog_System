const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


//POST
router.post('/',async(req,res)=>{
    const postCategory = new Category(req.body);
    try {
        const saveCategory = await postCategory.save()
        return res.status(200).json(saveCategory);
    } catch (err) {
        return res.status(500).json(err);
    }
})
//GET
router.get('/',async(req,res)=>{
    try {
        const postCategory = await Category.find();
        return res.status(200).json(postCategory);
    } catch (err) {
        return res.status(500).json(err);
    }
})
module.exports = router;