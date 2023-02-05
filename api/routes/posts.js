const router = require("express").Router();
const Post = require("../models/Post");
const verify = require("../verifyToken");

//create blog
router.post("/new",async (req,res) => {
    const newPost = new Post({
    
        title:req.body.title,
        content:req.body.content,
        author:req.body.author,
        
    });
    try{
        const post = await newPost.save();  
        res.status(201).json(post);
    }catch(err){
        res.status(500).json(err);
    }
    
});

//save blog
router.put("/save/:id",async (req,res)=>{

    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedPost); 
    }catch(err){
        res.status(500).json(err);
    } 

})
//get blog
router.get("/get/:id",async (req,res)=>{

    try{
        const post = await Post.findOne({_id:req.params.id});
        res.status(200).json(post); 
    }catch(err){
        res.status(500).json(err);
    } 

})

//published?
router.put("/publish/:id",async (req,res)=>{

    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedPost); 
    }catch(err){
        res.status(500).json(err);
    } 
    
})

//retreive blogs
router.get("/myworks",async (req,res)=>{

    const query = req.query.new;
    console.log(query);
    try{
        const posts = query ? await Post.find().sort({ _id: -1 }).limit(10) : await Post.find();
          
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }

})
router.put("/like/:id",async (req,res)=>{

    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedPost); 
    }catch(err){
        res.status(500).json(err);
    } 

})
module.exports = router;