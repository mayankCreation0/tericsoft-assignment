const mongoose = require("mongoose");
const bmiSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    height: {
        type:Number,
        required: true,
    },
    weight: {
        type:Number,
        required:true
    },
    bmi: {
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: () => new Date().toISOString().substring(0, 10),
    }
});
module.exports = mongoose.model('bmi', bmiSchema);