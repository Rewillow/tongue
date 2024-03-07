const express = require("express")
const router = express()
const interactionsController = require("../controllers/interactions.controller")

router.post('/post/:id/createInteraction', interactionsController.createInteraction) // Rotta per la creazione di un'interazione
router.delete('/post/:id/deleteInteractions', interactionsController.deleteAllInteractions) // Rotta per eliminare tutte le interazioni
router.delete('/post/:id/deleteComment', interactionsController.deleteComment) // Rotta per eliminare solo il commento
router.delete('/post/:id/deleteLike', interactionsController.deleteLike) // Rotta per eliminare solo il mi piace
router.put('/post/:id/changeInteraction', interactionsController.changeInteraction) // Rotta per cambiare un'interazione

module.exports = router