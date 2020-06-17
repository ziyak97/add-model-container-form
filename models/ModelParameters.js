const mongoose = require('mongoose')

const ModelParametersSchema = new mongoose.Schema({
    modelType: {
        type: mongoose.Schema.Types.String,
        ref: 'modelRepo'
    },
    parameterName: {
        type: String,
        required: true
    },
    displayName: {
        type: mongoose.Schema.Types.String,
        ref: 'modelRepo'
    },
    minValue: {
        type: Number
    },
    maxValue: {
        type: Number
    },
    defaultValue: {
        type: Number
    },
    type: {
        type: String,
        required: true
    },
    yVarType: {
        type: mongoose.Schema.Types.String,
        ref: 'modelRepo'
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('modelParameters', ModelParametersSchema)