const express = require('express')
const cors = require('cors')
const connectDb = require('./config/db')

const app = express()

// Connect to database
connectDb()

// Initilize middleware
app.use(cors())
app.use(express.json())

// Define routes
app.use('/api/models', require('./routes/api/model'))
app.use('/api/modelParameters', require('./routes/api/modelParameters'))
app.use('/api/containers', require('./routes/api/container'))

const PORT = 5000

app.listen(PORT, console.log(`Listening on port ${PORT}`))