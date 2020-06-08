const express = require('express')
const router = express.Router()

const Container = require('../../models/Container')

// @route    POST api/containers
// @desc     Add container
// @access   Public
router.post('/', async (req, res) => {
    try {
        const {
            containerName,
            numberOfSteps,
            models
        } = req.body
    
        const newContainer = new Container({
            containerName,
            numberOfSteps,
            models
        })
        const container = await newContainer.save()
        
        res.json(container)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
    
})

// @route    GET api/containers
// @desc     Get all container
// @access   Public
router.get('/', async (req, res) => {
    const container = await Container.find()
    res.json(container)
})

module.exports = router