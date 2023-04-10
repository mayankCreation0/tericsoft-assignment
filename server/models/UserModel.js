const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: "string",
    },
    email:{
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        required: true,
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('user', userSchema);