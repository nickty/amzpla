const express = require('express')
const router = express.Router()

const {
  getUserList,
  getUserById,
  deleteUserById,
  updateUserById,
} = require('../controllers/usersController')

router.get('/', getUserList)
router.get('/:id', getUserById)
router.put('/:id', updateUserById)
router.delete('/:id', deleteUserById)

module.exports = router
