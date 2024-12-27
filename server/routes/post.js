const express = require("express")
const router = express.Router()
const postController=require("../controllers/postController")

router.post("/addPost",postController.addPost)
router.get("/getPost/:id",postController.getPost)
router.get("/getPosts",postController.getPosts)
router.put("/updatePost",postController.updatePost)
router.delete("/deletePost/:id",postController.deletePost)
module.exports=router