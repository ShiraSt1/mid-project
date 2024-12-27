const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    userName: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true,
        lowercase: true
    },
    address: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    phone: {
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('User', userSchema)