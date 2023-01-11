const router = require("express").Router();
const Post = require("../models/Post");
//const verify = require("../verifyToken");
const User = require("../models/User")
//post comment
router.post("/post/:id",async (req,res) => {
    const user = await User.findOne({ username: req.body.author });
    if(user.id === req.params.id){
        
        const newPost = new Post({
            content:req.body.post,
            author:req.body.author,
        });
        try{
            const post = await newPost.save();  
            res.status(201).json(post);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("cannot post without logging in!");
    }
    
    
});

//get all comments
router.get("/",async (req,res) => {
    
    const query = req.query.new;
    console.log(query);
    try{
        const posts = query ? await Post.find().sort({ _id: -1 }).limit(10) : await Post.find();
          
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
    
});


//delete comment

router.delete("/delete/:id",async (req,res)=>{
    const user = await User.findOne({ _id: req.params.id });
    const post = await Post.findOne({ author:req.body.author })
    if(user.id === req.params.id||user.isAdmin){
        
        try{
            await Post.findByIdAndDelete(post.id);
            console.log("deleted");
            res.status(200).json("User deleted!"); 
        }catch(err){
            res.status(500).json(err);
        } 
    }else{
        res.status(403).json("delete only your account!");
    }
})
module.exports = router;