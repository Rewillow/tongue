const express = require("express")
const router = express.Router()
const postController = require('../controllers/post.controller')

router.get('/post', postController.filterInteractions) // Rotta che restituisce tutti i post coi rispettivi aggregati
router.post('/post/:userId', postController.postCreate) // Rotta per la creazione di un post
router.delete('/post/:id', postController.postDelete) // Rotta per eliminare un post
router.put('/post/:id', postController.postChange) // Rotta per modificare un post
router.get('/post/filterByCity', postController.filterByCity) // Rotta che restituisce i post filtrati per città e data
router.get('/post/createdDate', postController.postFilter) // Rotta per restituire i post filtrati tramite data


module.exports = router