const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connection_url = "mongodb+srv://newUser:newPassword@cluster0.9pdv8.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connection_url)
.then(() => console.log('Successfully connected'))
.catch((error) => console.error('Could not connect due to ${error}'))

app.get('/'. (req, res) => {
   res.send('Hello World!')
})

app.listen(3001)
