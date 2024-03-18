const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")

router.get('/users', userController.allUser) // Rotta che restituisce tutti gli utenti
router.post('/users', userController.userCreate) // Rotta per creare un utente
router.delete('/user/:id', userController.userDelete) // Rotta per eliminare un utente
router.put('/user/:id', userController.userChange) // Rotta per cambiare i parametri di un utente

module.exports = router