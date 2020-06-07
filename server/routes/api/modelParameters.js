const express = require('express')
const router = express.Router()

const Model = require('../../models/Model')
const ModelParameters = require('../../models/ModelParameters')

// @route    POST api/modelParameters
// @desc     Create parameters for selected model
// @access   Public
router.post('/', async (req, res) => {
    try {
        const model = await Model.findOne({ modelType: req.body.modelType })
        
        const newModelParameters = new ModelParameters({
            modelType: model.modelType,
            parameterName: req.body.parameterName,
            displayName: req.body.displayName,
            minValue: req.body.minValue,
            maxValue: req.body.maxValue,
            defaultValue: req.body.defaultValue,
            type: req.body.type,
            yVarType: model.yVarType,
            description: req.body.description
        })

        const modelParameters = await newModelParameters.save()

        res.json(modelParameters)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route    GET api/modelParameters
// @desc     Get all modelParameters
// @access   Public
router.get('/', async (req, res) => {
    const modelParameters = await ModelParameters.find()
    res.json(modelParameters)
})

module.exports = router