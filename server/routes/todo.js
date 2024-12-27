const express = require("express")
const router = express.Router()
const todoController=require("../controllers/todoController")

router.post("/addTodo",todoController.addTodo)
router.get("/getTodo/:id",todoController.getTodo)
router.get("/getTodos",todoController.getTodos)
router.put("/updateTodo",todoController.updateTodo)
router.delete("/deleteTodo/:id",todoController.deleteTodo)

module.exports=router