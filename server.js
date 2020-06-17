const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDb = require('./config/db')

const app = express()

// Connect to database
connectDb()

// Initilize middleware
app.use(cors())
app.use(express.json())

// If production serve static files
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

// Define routes
app.use('/api/models', require('./routes/api/model'))
app.use('/api/modelParameters', require('./routes/api/modelParameters'))
app.use('/api/containers', require('./routes/api/container'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Listening on port ${PORT}`))