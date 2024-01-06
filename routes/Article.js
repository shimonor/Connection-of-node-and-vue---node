const express = require('express')
const router = express.Router()
const System = require("../controllers/ArticleControllers")

router.get('/', System.getAll)
router.get('/:id', System.getArticle)
router.post('/add', System.addArticle)
router.patch('/:id', System.updateArticle)
router.delete('/:id', System.delArticle)

module.exports = router;