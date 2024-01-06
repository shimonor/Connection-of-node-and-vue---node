const express = require('express')
const router = express.Router()
const System = require("../controllers/user-controllers")
const auth = require("../middleware/auth")

router.get('/', auth, System.getAll)
router.get('/:id',auth, System.getUser)
router.post('/add', System.addUser)
router.patch('/:id',auth, System.updateUser)
router.delete('/:id', System.delUser)
router.post('/login', System.login)

module.exports = router;