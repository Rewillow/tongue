const express = require("express")
const router = express()
const interactionsController = require("../controllers/interactions.controller")

router.post('/post/:id/createInteraction', interactionsController.createInteraction) // Rotta per la creazione di un'interazione
router.delete('/interaction/:id/deleteInteractions', interactionsController.deleteAllInteractions) // Rotta per eliminare tutte le interazioni
router.delete('/interaction/:id/deleteComment', interactionsController.deleteComment) // Rotta per eliminare solo il commento
router.delete('/interaction/:id/deleteLike', interactionsController.deleteLike) // Rotta per eliminare solo il mi piace
router.put('/interaction/:id/changeInteraction', interactionsController.changeInteraction) // Rotta per cambiare un'interazione

module.exports = router