// implement your posts router here
const express = require('express')
const poster = require('./posts-model')
const router = express.Router();

router.get('/',(req,res)=> {
    poster.find()
    .then((posts)=>{
        res.status(200).json(posts);
    })
    .catch((error)=>{
        res.status(500).json({ message: "The posts information could not be retrieved"});
    })
})

router.get('/:id',(req,res)=>{
    poster.findById(req.params.id)
    .then((post)=>{
        if(post){
            res.status(200).json(post);
        }else {
            res.status(404).json({message: "The post with the specified ID does not exist"});
        }
    })
    .catch((error)=>{
        res.status(500).json({ message: "The post information could not be retrieved" });
    })

})


router.post('/',(req,res)=>{
    if(!req.body.title || req.body.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" });
    }
    poster.insert(req.body)
    .then((post)=>{
        res.status(201).json(post);
    })
    .catch((error)=>{
        res.status(500).json({ message: "There was an error while saving the post to the database" });
    })

})

// router.put('/:id',(req,res)=>{
//     const changedPost = req.body;

// }) 

router.delete('/:id',(req,res)=>{
    poster.remove(req.params.id)
    .then(deletedPost =>{
        res.status(200).json({deletedPost});

    }).catch((err) => {
        res.status(500).json({ msg: "The post could not be removed" });
    })

})

//router.get('/:id/comments',(req,res)=>)



module.exports = router;