const express = require("express")
const router = express.Router()
const postController = require('../controllers/post.controller')

router.get('/posts', postController.filterInteractions) // Rotta che restituisce tutti i post coi rispettivi aggregati
router.post('/posts/:userId', postController.postCreate) // Rotta per la creazione di un post
router.delete('/posts/:id', postController.postDelete) // Rotta per eliminare un post
router.put('/posts/:id', postController.postChange) // Rotta per modificare un post
router.get('/posts/filterByCity', postController.filterByCity) // Rotta che restituisce i post filtrati per città e data
router.get('/posts/createdDate', postController.postFilter) // Rotta per restituire i post filtrati tramite data


module.exports = router