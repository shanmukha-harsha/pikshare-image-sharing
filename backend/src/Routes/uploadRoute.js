const express = require('express')
const multer = require('multer')

const uploadController = require('../Controllers/imageUploadController')

const router = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/Uploads")
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})

router.post("/upload", upload.single('image'), uploadController.upload)
router.get("/posts", uploadController.posts)

module.exports = router
