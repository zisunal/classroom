// defining the server port

// initializing installed dependencies
const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed to you'))
        }
    }
}
app.use(cors(corsOptions));
app.use(express.json())
const port = process.env.REACT_APP_PROXY_SERVER.split(':')[2].replace('/', '')
app.listen(port, ()=> console.log(`Server is running on ${port}` ))

// API requests
const headers = {
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + process.env.REACT_APP_API_TOKEN,
    'Accept': 'application/json'
}
app.get('/app-info', (req,res)=>{    
    fetch(process.env.REACT_APP_API_BASE + 'app-info', {
        method: 'GET',
        headers
    }).then(response => response.json()).then(data => {
        res.json(data)
    })
})
app.post('/register', (req,res)=>{
    fetch(process.env.REACT_APP_API_BASE + 'register', {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body)
    }).then(response => response.json()).then(data => {
        res.json(data)
    })
})
app.post('/verify', (req,res)=>{
    fetch(process.env.REACT_APP_API_BASE + 'verify', {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body)
    }).then(response => response.json()).then(data => {
        res.json(data)
    })
})
app.post('/send-otp', (req,res)=>{
    fetch(process.env.REACT_APP_API_BASE + 'send-otp', {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body)
    }).then(response => response.json()).then(data => {
        res.json(data)
    })
})
app.post('/login', (req,res)=>{
    fetch(process.env.REACT_APP_API_BASE + 'login', {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body)
    }).then(response => response.json()).then(data => {
        res.json(data)
    })
})
app.post('/create-class', (req,res)=>{
    fetch(process.env.REACT_APP_API_BASE + 'create-class', {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body)
    }).then(response => response.json()).then(data => {
        res.json(data)
    })
})
app.post('/get-teaching-classes', (req,res)=>{
    fetch(process.env.REACT_APP_API_BASE + 'get-teaching-classes', {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body)
    }).then(response => response.json()).then(data => {
        res.json(data)
    })
})