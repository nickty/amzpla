const express = require('express')
const router = express.Router()

const { getUserList } = require('../controllers/usersController')
router.get('/', getUserList)

module.exports = router
