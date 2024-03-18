const express = require("express")
const router = express()
const interactionsController = require("../controllers/interactions.controller")

router.post('/posts/interaction/:id', interactionsController.createInteraction) // Rotta per la creazione di un'interazione
router.delete('/posts/interaction/:id', interactionsController.deleteAllInteractions) // Rotta per eliminare tutte le interazioni
router.put('/posts/interaction/:id', interactionsController.changeInteraction) // Rotta per cambiare un'interazione
router.delete('/posts/interaction/comment/:id', interactionsController.deleteComment) // Rotta per eliminare solo il commento
router.delete('/posts/interaction/like/:id', interactionsController.deleteLike) // Rotta per eliminare solo il mi piace


module.exports = router