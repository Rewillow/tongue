const { Sequelize } = require("sequelize")
const Post = require("../models/Post")
const Interactions = require("../models/Interactions")
const User = require("../models/User")

const postController = {
    // Funzione che restituisce tutti i post con gli aggregati 'like' e 'comment'
    filterInteractions: async(req,res) => {
        try {
            const allPost = await Post.findAll({include: {model:Interactions, attributes:['like', 'comment']}})
            if(allPost.length === 0) {
                return res.status(400).json({message:'Nessun post trovato'})
            }
            return res.status(200).json({allPost})
        } catch(err) {
            console.log(err);
            return res.status(500).json({error:"Errore nella restituzione della lista utenti"})
        }
    },
    filterByCity: async (req, res) => {
        const { city, timetable} = req.query; 
        try {
            const allPostByCity = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['city'],
                        where: { city: city } 
                    },
                    {
                        model: Interactions,
                        attributes: ['like', 'comment', 'timetable'],
                        where: {timetable:timetable}
                    }
                ]
            });
            if (allPostByCity.length === 0) {
                return res.status(400).json({ message: 'Nessun post trovato' });
            }
            if(allPostByCity[0]?.Interactions.length === 0) {
                return res.status(400).json({message:"Nessuna interazione per la città selezionata"})
            }
            return res.status(200).json({allPostByCity});
        } catch (err) {
            return res.status(500).json({error:"Errore durante il filtraggio dei post"});
        }
    },
        // Return post for the date
        postFilter: async (req, res) => {
            const { created_at } = req.query;
            try {
              const filteredPosts = (await Post.findAll({where: {created_at: Sequelize.literal(`DATE(created_at) = DATE('${created_at}')`)}}))
              if (filteredPosts.length === 0) {
                return res.status(404).json({ message: 'Nessun post trovato per la data selezionata' });
              }
              return res.status(200).json({ filteredPosts });
            } catch (err) {
              console.error(err);
              return res.status(500).json({ error: 'Errore durante il filtraggio dei post' });
            }
          },
    // Create a new post
    postCreate : async (req,res) => {
        const {userId} = req.params
        const {title} = req.body
        try {
            const existingTitle = await Post.findOne({where: {userId:userId}})
            if(existingTitle) {
                return res.status(400).json({error: 'ID utente non trovato'})
            }
            const newPost = await Post.create({title, userId})
            return res.status(200).json(newPost)
        } catch(err) {
            return res.status(500).json({error:'Errore nella creazione del post', err})
        }
    },

    // Delete a post
    postDelete: async(req,res) => {
        const {id} = req.params
    try {
        const existingId = await Post.findOne({where: {id}})
        if(!existingId) {
            return res.status(400).json({error:'Post non trovato'})
        }
        const deletePost = await Post.destroy({where:{id}})
        return res.status(200).json({message:"Eliminazione completata", deletePost})
    } catch(err) {
        return res.status(500).json({error:"Errore nell\'eliminazione del post", err})
    }
    },
    // Change post params
    postChange: async(req,res) => {
        const {title} = req.body
    try {
        const {id} = req.params
        const existingId = await Post.findOne({where: {id}})
        if(!existingId) {
            return res.status(400).json({message:"Post non trovato"})
        }
        if(title !== existingId.title) {
            const newData = new Date()
            req.body.created_at = newData
        }
        const changeParams = await Post.update(req.body, {where:{id}})
        return res.status(200).json({message: 'Modifica completata', changeParams})
    } catch(err) {
        res.status(500).json({error:"Errore nella modifica dei parametri"})
    }
    },
      
}

module.exports = postController