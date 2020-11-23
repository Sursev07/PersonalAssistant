const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());

//login
app.post('/login', (req, res) => {
 if(req.body.email === 'seven@mail.com' && req.body.password === 'rainbow') {
     res.status(200).json({access_token: 'asdfgfdsaer', message: 'Hello world'})
 } else {
     res.status(401).json({message: 'Invalid account'})
 }
})

app.post('/voice', (req, res)=> {
    console.log("Received: " + req)
    getResponse(req.body.voiceText, function (response) {
        res.status(200).json({
            message : response
        })
    } )
})

function getResponse(message, callback){
    if(message === 'hello') {
        callback(`Hai Seven. How's life??` )
    } else if( message === 'Do you miss me') {
        callback(`Definitely!!!` )
    } else if( message === 'who are you')
    {
        callback(`I am your personal assistant` )
    } else {
        callback(message)
    }
}

app.listen(port, () => {
    console.log(`listen on port ${port}`)
})