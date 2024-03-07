const User = require("../models/User")

const userController = {
    allUser: async(req,res) => {
        try {
            const resUser = await User.findAll()
            return res.status(200).json(resUser)
        } catch(err) {
            return res.status(500).json({error:"Errore nella restituzione della lista utenti"})
        }
    },
    // Function to create a new user
    userCreate: async(req,res) => {
        const {nickname, age, city} = req.body // Questi i campi necessari da compilare
    try {
        const existingUser = await User.findOne({where: {nickname: nickname}}) // Per verificare se il nickname è già utilizzato
        if(existingUser) {
            return res.status(400).json({error: 'Nickname già utilizzato'}) // Se la condizione è vera viene dato il relativo avviso
        } 
        const newUser = await User.create({nickname, age, city}) // Se la condizione non è vera viene creato un nuovo utente
        return res.status(200).json(newUser)
    } catch(err) {
        console.error('Errore nella creazione', err);
        return res.status(500).json({ error: 'Errore nella creazione dell\'utente' });
    }
    },
    // Function to delete a user
    userDelete: async(req,res) => {
        const {id} = req.params
    try {
        const existingId = await User.findOne({where: {id}})
        if(!existingId) {
            return res.status(400).json({error: 'ID not found'})
        }
        const deleteUser = await User.destroy({where: {id}})
        return res.status(200).json({message:'Removal completed', deleteUser})
    } catch(err) {
        console.error(err);
        return res.status(500).json({error: 'Removal non completed', err})
    }
    },
    // Change user params
    userChange: async(req,res) => {
        const {nickname, age, city} = req.body
    try {
        const {id} = req.params
        const existingId = await User.findOne({where: {id}})
        if(!existingId) {
            return res.status(400).json({error: 'ID not found'})
        }
        const changeParams = await User.update({nickname,age,city}, {where: {id}})
        return res.status(200).json({message: 'Change completed', changeParams})
    } catch(err) {
        console.error(err);
        return res.status(500).json({error: 'Change not completed', err})
    }
    }
}

module.exports = userController
