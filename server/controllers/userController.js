const User = require("../models/User");

//create
const addUser= async (req, res) => {
    const { name, userName, email, address, phone } = req.body
    const usernameExist=await User.findOne({userName:userName}).lean()
    if(usernameExist){
        return res.status(400).send("userName is not available")
    }
    if (!name||!userName||!email||!address) {
        return res.status(400).send("name and userName and email and address are required")
    }
    const user = await User.create({ name, userName, email, address, phone });
    const users=await User.find().lean()
    if(!users){
        return res.status(400).send("users not found")
    }
    res.json(users)
}

//read
const getUser= async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id).lean();
    if (!user)
        return res.status(400).send("user not found")
    res.json(user)
}

const getUsers= async (req, res) => {

    const users = await User.find().lean();
    if (!users)
        return res.status(400).send("users not found")
    res.json(users)
}

//update
const updateUser= async (req, res) => {
    const { id, name, userName, email, address, phone } = req.body
    if (!name || !id || !usreName || !email || !address) {
        return res.status(400).send("name and id and usreName and email and address are required")
    }
    const usernameExist=await User.findOne({userName:userName}).lean()
    if(usernameExist && usernameExist._id.toString()!=id){
        return res.status(400).send("userName is not available")
    }
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).send("user not found")
    }
    user.name = name
    user.userName = userName
    user.email = email
    user.address = address
    user.phone = phone

    const newUser = await user.save()

    const users=await User.find().lean()
    if(!users){
        return res.status(400).send("users not found")
    }
    res.json(users)
}

//delete
const deleteUser= async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).send("id is required")
    }
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).send("user not found")
    }

    const result = await user.deleteOne()
    const users = await User.find().lean();
    if(!users){
        return res.status(400).send("users not found")
    }
    res.json(users)
}

module.exports = {
    addUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}
