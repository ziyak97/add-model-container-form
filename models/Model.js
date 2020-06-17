const mongoose = require('mongoose')

const ModelSchema = new mongoose.Schema({
    modelType: {
        type: String,
        required: true
    },
    functionName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    yVarType: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    },
    updatedAt: {
        type: Date
    }
})

module.exports = mongoose.model('modelRepo', ModelSchema)