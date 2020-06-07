const express = require('express')
const router = express.Router()

const Model = require('../../models/Model')

// @route    POST api/models
// @desc     Add model
// @access   Public
router.post('/', async (req, res) => {
    try {
        const { modelType,
            functionName,
            path,
            yVarType,
            displayName,
            updatedAt } = req.body

        const newModel = new Model({
            modelType,
            functionName,
            path,
            yVarType,
            displayName,
            updatedAt
        })

        const model = await newModel.save()
        res.json(model)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route    GET api/models
// @desc     Get all models
// @access   Public
router.get('/', async (req, res) => {
    const models = await Model.find()
    res.json(models)
})

module.exports = router