const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")

router.get('/user', userController.allUser) // Rotta che restituisce tutti gli utenti
router.post('/user/createUser', userController.userCreate) // Rotta per creare un utente
router.delete('/user/:id/deleteUser', userController.userDelete) // Rotta per eliminare un utente
router.put('/user/:id/changeUserParams', userController.userChange) // Rotta per cambiare i parametri di un utente

module.exports = router