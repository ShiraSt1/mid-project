const express = require("express")
const router = express.Router()
const userController=require("../controllers/userController")

router.post("/addUser",userController.addUser)
router.get("/getUser/:id",userController.getUser)
router.get("/getUsers",userController.getUsers)
router.put("/updateUser",userController.updateUser)
router.delete("/deleteUser/:id",userController.deleteUser)
module.exports=router 