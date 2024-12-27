const Todo = require("../models/Todo");

//create
const addTodo= async (req, res) => {
    const { title, tags } = req.body
    const titleExist=await Todo.findOne({title:title}).lean()
    if(titleExist){
        return res.status(400).send("title is not available")
    }
    if (!title || !tags) {
        return res.status(400).send("tite and tags are required")
    }
    const tagsArray=tags.split(",")
    const todo = await Todo.create({title: title, tags: tagsArray });
    const todos=await Todo.find().lean();
    if(!todos){
        return res.status(400).send("todos not found")
    }
    res.json(todos)
}

//read
const getTodo= async (req, res) => {
    const { id } = req.params

    const todo = await Todo.findById(id).lean();
    if (!todo)
        return res.status(400).send("task not found")
    res.json(todo)
}

const getTodos= async (req, res) => {

    const todos = await Todo.find().lean();
    if (!todos)
        return res.status(400).send("tasks not found")
    res.json(todos)
}

//update
const updateTodo= async (req, res) => {
    const { id, title, tags, completed } = req.body
    const titleExist=await Todo.findOne({title:title}).lean()
    if(titleExist && titleExist._id!=id){
        return res.status(400).send("if1")
    }
    if (!title || !id ||!tags) {
        return res.status(400).send("if2")
    }
    const todo = await Todo.findById(id).exec();
    if (!todo) {
        return res.status(400).send("if3")
    }
    if(typeof(tags)===typeof("String"))
        {
            const t=tags.split(",")
            todo.tags = t
        }
        else{
            todo.tags = tags
        }
    todo.title = title
    todo.completed = completed
    const newTodo = await todo.save()
    const todos = await Todo.find().lean();
    if(!todos){
        return res.status(400).send("todos not found")
    }
    res.json(todos)
}

//delete
const deleteTodo= async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).send("id is required")
    }
    const todo = await Todo.findById(id).exec();
    if (!todo) {
        return res.status(400).send("todo not found")
    }
     const result = await todo.deleteOne()
    // const reply = `Task ${result.title} ID ${result.id} deleted`
    const todos = await Todo.find().lean();
    console.log(todos)
    if(!todos){
        return res.status(400).send("todos not found")
    }
    res.json(todos)
}

module.exports = {
    addTodo,
    getTodo,
    getTodos,
    updateTodo,
    deleteTodo
}