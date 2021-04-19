const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Course = require('../models/course')
const Tutorial = require('../models/tutorial')
const router = new express.Router()

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

router.post('/courses', upload.single('avatar'), async (req,res) => {
    try {
        const tut = await Tutorial.findOne({ name: req.body.tut })
        const buffer = await sharp(req.file.buffer).resize({ width: 390, height: 240 }).png().toBuffer()
        const course = new Course({
            ...req.body,
            tut: tut._id,
            avatar: buffer
        })
        await course.save()
        res.status(201).send(course)
    } catch(e) {
        res.status(400).send(e)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

module.exports = router