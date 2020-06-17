const mongoose = require('mongoose')

const ContainerModelSchema = new mongoose.Schema({
    modelName: {
        type: String,
        required: true
    },
    modelType: {
        type: String,
        required: true
    },
    stepNumber: {
        type: String,
        required: true
    },
    parameters: {
        type: Array,
        required: true
    }
})

const ContainerSchema = new mongoose.Schema({
    containerName: {
        type: String,
        required: true
    },
    numberOfSteps: {
        type: Number,
        required: true
    },
    models: [ContainerModelSchema],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('parentContainer', ContainerSchema)