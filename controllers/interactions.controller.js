const { DataTypes, Sequelize } = require('sequelize')
const Interactions = require('../models/Interactions')
const Post = require("../models/Post")

const interactionsController = {
  // Funzione per creare un'interazione
  createInteraction: async (req, res) => {
    const { like, comment } = req.body;
    try {
      const id = req.params.id;
      const existingPost = await Post.findByPk(id);
      if (!existingPost) {
        return res.status(400).json({ message: "Post non trovato" });
      }
      const newInteraction = await Interactions.create({ like, comment, postId: id });
      return res.status(200).json({ message: 'Interazione creata correttamente', newInteraction });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Errore nella creazione dell\'interazione", err });
    }
  },
  deleteAllInteractions: async(req,res) => {
    const {id} = req.params
    try {
      const existingId = await Interactions.findOne({where:{postId:id}})
      if(!existingId) {
        return res.status(400).json({message:"ID non trovato"})
      }
      const deleteInteraction = await Interactions.destroy({where:{postId:id}})
      return res.status(200).json({message:"Interazione eliminata correttamente", deleteInteraction})
    } catch(err) {
      return res.status(500).json({error:"Errore nell\'eliminazione dell\'interazione", err})
    }
  },
  // Funzione per eliminare solo il commento
    deleteComment: async (req, res) => {
      const {id} = req.params;
      try {
        const interaction = await Interactions.findOne({ where: { postId:id } });
        if (!interaction) {
          return res.status(404).json({ message: 'Interazione non trovata' });
        }
        interaction.comment = null;
        await interaction.save();
        if(interaction.comment === null && interaction.like === false) {
          const deleteId = await Interactions.destroy({where:{postId:id}})
          return res.status(200).json({message: 'Interazione eliminata', deleteId})
        }
        return res.status(200).json({ message: 'Commento rimosso dall\'interazione' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Errore nell\'eliminazione del commento', err });
      }
    },    
    // Funzione per eliminare solo il like 
    deleteLike: async (req, res) => {
      const {id} = req.params;
      try {
        const interaction = await Interactions.findOne({ where: { postId:id } });
        if (!interaction) {
          return res.status(404).json({ message: 'Interazione non trovata' });
        }
        interaction.like = false;
        await interaction.save();
        if(interaction.comment === null && interaction.like === false) {
          const deleteId = await Interactions.destroy({where:{postId:id}})
          return res.status(200).json({message: 'Interazione eliminata', deleteId})
        }
        return res.status(200).json({ message: 'Like rimosso correttamente' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Errore nell\'eliminazione del like', err });
      }
    },    
    // Funzione per modificare un commento o un like
    changeInteraction: async (req, res) => {
      const { like, comment, timetable } = req.body;
      try {
        const {id} = req.params;
        const existingId = await Interactions.findOne({ where: {postId:id}});
        if (!existingId) {
          return res.status(400).json({ message: 'ID non trovato'});
        }
        if (like !== existingId.like || comment !== existingId.comment || timetable !== existingId.timetable ) {
          const newTimetable = new Date(); 
          req.body.timetable = newTimetable;
        }
        const changeParams = await Interactions.update(req.body, { where: { postId:id } });
        return res.status(200).json({ message: 'Modifica completata correttamente', changeParams });
      } catch (err) {
        return res.status(500).json({ error: 'Errore nella modifica delle interazioni', err });
      }
    }
    
}

module.exports = interactionsController
















    // deleteInteraction: async(req,res) => {
    //   const {id} = req.params
    //   try {
    //      const existingId = await Interactions.findOne({where:{id}})
    //      if(!existingId) {
    //         return res.status(400).json({message: 'ID not found'})
    //      }
    //      const deleteId = await Interactions.destroy({where:{id}})
    //      return res.status(200).json({message: 'Delete Interaction', deleteId})
    //   } catch(err) {
    //      return res.status(500).json({error: 'Delete non complete', err})
    //   }
    // },