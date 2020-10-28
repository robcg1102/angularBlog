const router = require('express').Router()
const articleController = require('../controllers/articleController');

const multipart = require('connect-multiparty')
const md_upload = multipart({
    uploadDir: './upload/articles'
})
// Rutas de prueba

router.get('/test', articleController.test);
router.post('/datos-curso', articleController.datosCurso);

// Rutas para artículos

router.post('/save', articleController.save);
router.get('/articles/:last?', articleController.getArticles)
router.get('/article/:id', articleController.getArticle)
router.put('/article/:id', articleController.update)
router.delete('/article/:id', articleController.delete)

router.post('/upload-image/:id', md_upload, articleController.upload)
router.get('/get-image/:image', articleController.getImage)
router.get('/search/:search', articleController.search)

module.exports = router;