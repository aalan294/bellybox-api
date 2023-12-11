const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {v4:uuidv4} = require('uuid')
const menuModel = require('../MODELS/menuModel')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

router.route('/')
    .get(require('../CONTROLLERS/menuController').getMenus)
    .post(upload.single('image'),require('../CONTROLLERS/menuController').newMenu)
router.route('/:id')
    .get(require('../CONTROLLERS/menuController').getSingleMenu)
    .put(require('../CONTROLLERS/menuController').updateMenu)
    .delete(require('../CONTROLLERS/menuController').deleteMenu)

module.exports = router