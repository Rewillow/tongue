const express = require("express")
const router = express.Router()
const postController = require('../controllers/post.controller')

router.get('/post', postController.filterByInteractions) // Rotta che restituisce tutti i post coi rispettivi aggregati
router.get('/post/filterByCity', postController.filterByCity) // Rotta che restituisce i post filtrati per città coi rispettivi aggregati
router.get('/post/created_at', postController.postFilter) // Rotta per restituire i post filtrati tramite data
router.post('/post/createPost', postController.postCreate) // Rotta per la creazione di un post
router.delete('/post/:id/deletePost', postController.postDelete) // Rotta per eliminare un post
router.put('/post/:id/changePostParams', postController.postChange) // Rotta per modificare un post


module.exports = router