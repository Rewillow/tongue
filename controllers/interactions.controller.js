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
        return res.status(400).json({ message: "Post not found" });
      }
      const newInteraction = await Interactions.create({ like, comment, postId: id });
      return res.status(200).json({ message: 'Interaction created', newInteraction });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Interaction not completed", err });
    }
  },
  deleteAllInteractions: async(req,res) => {
    const {id} = req.params
    try {
      const existingId = await Interactions.findOne({where:{id}})
      if(!existingId) {
        return res.status(400).json({message:"ID not found"})
      }
      const deleteInteraction = await Interactions.destroy({where:{id}})
      return res.status(200).json({message:"Interaction deleted", deleteInteraction})
    } catch(err) {
      return res.status(500).json({error:"Interaction not deleted", err})
    }
  },
  // Funzione per eliminare solo il commento
    deleteComment: async (req, res) => {
      const {id} = req.params;
      try {
        const interaction = await Interactions.findOne({ where: { id } });
        if (!interaction) {
          return res.status(404).json({ message: 'Interaction not found' });
        }
        interaction.comment = null;
        await interaction.save();
        if(interaction.comment === null && interaction.like === false) {
          const deleteId = await Interactions.destroy({where:{id}})
          return res.status(200).json({message: 'Delete Interaction', deleteId})
        }
        return res.status(200).json({ message: 'Comment removed from interaction' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete comment', err });
      }
    },    
    // Funzione per eliminare solo il like 
    deleteLike: async (req, res) => {
      const {id} = req.params;
      try {
        const interaction = await Interactions.findOne({ where: { id } });
        if (!interaction) {
          return res.status(404).json({ message: 'Interaction not found' });
        }
        interaction.like = false;
        await interaction.save();
        if(interaction.comment === null && interaction.like === false) {
          const deleteId = await Interactions.destroy({where:{id}})
          return res.status(200).json({message: 'Delete Interaction', deleteId})
        }
        return res.status(200).json({ message: 'Like removed from interaction' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete comment', err });
      }
    },    
    // Funzione per modificare un commento o un like
    changeInteraction: async (req, res) => {
      const { like, comment, timetable } = req.body;
      try {
        const {id} = req.params;
        const existingId = await Interactions.findOne({ where: {id}});
        if (!existingId) {
          return res.status(400).json({ message: 'ID not found'});
        }
        // Update "timetable" to the current date and time if any field is modified
        if (like !== existingId.like || comment !== existingId.comment || timetable !== existingId.timetable ) {
          const newTimetable = new Date(); // Assuming you want to store a Date object
          req.body.timetable = newTimetable;
        }
        const changeParams = await Interactions.update(req.body, { where: { id } });
        return res.status(200).json({ message: 'Change completed', changeParams });
      } catch (err) {
        return res.status(500).json({ error: 'Error on change params', err });
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