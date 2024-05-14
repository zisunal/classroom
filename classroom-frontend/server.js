// defining the server port
const port = 5000

// initializing installed dependencies
const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000',
}))

// listening for port 5000
app.listen(5000, ()=> console.log(`Server is running on ${port}` ))

// API request
app.get('/app-info', (req,res)=>{    
    fetch(process.env.REACT_APP_API_BASE + 'app-info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.REACT_APP_API_TOKEN
        }
    }).then(response => response.json())
})