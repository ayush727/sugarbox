require('dotenv').config()

const express = require('express');
const jwt = require('jsonwebtoken')
const connection = require('./model/connection')
const schema = require('./model/schema')
const users = schema.users
const port = 8080
const app = express()
const bcrypt = require('bcrypt')

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.post('/adduser', async (req, res) => {
    users.findOne({'email':req.body.email}, async (err, userDoc) => {
        if(!err) {
            console.log('No error')
            if(userDoc) {
                return res.status(200).json({'msg':'User already present'})
            }
            else {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
                const user = new users(req.body)
                user.save((err, result) => {
                    if(err) {
                        res.status(400).json({"msg":"Incorrect field value"});
                    } else {
                        jwt.sign({username : req.body.email}, process.env.SECRET_KEY, (err, token) => {
                            if(!err) {
                                res.set('Token', token).json({"msg":"Success","id":result._id})
                            }
                        })
                    }
                });
            }
        } else {
            res.status(400).json({"msg":"Error in DB connection"})
        }
     })
})

app.get('/getusers' ,  (req, res) => {
    users.find({}).limit(10).exec((err, userdocs) => {
        if(!err) {
            if(userdocs.length == 0) 
                res.status(200).json({'msg':'No user present in the database'})
            else
                res.status(200).json(userdocs)
        } else {
            res.status(400).json({"msg":"Error in DB connection"})
        }
    })
})

app.get('/getuser/:id' , verifyToken, (req, res) => {
    users.findById(req.params.id , (err, userdoc) => {
        if(!err) {
            if(userdoc) 
                res.status(200).json(userdoc.tasks)
            else
                res.status(200).json({'msg':'No user present for that id'})
        } else {
            res.status(400).json({"msg":"Incorrect id"})
        }
    })
})

app.post('/deleteuser', verifyToken, (req,res) => {
    users.findByIdAndDelete(req.body.id, function (err, docs) {
        if (!err){
            if(docs) 
                res.status(200).json({'msg':'User with the given id deleted'})
            else
                res.status(200).json({'msg':'No user present for that id'})
        }
        else{
            res.status(400).json({"msg":"Incorrect id"})
        }
    });
})

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

connection.open()
    .then(() => {
        app.listen(port, () => {
            console.log('App is running on port', port);
        })
    })
    .catch(() => console.log('Error in DB'))

module.exports = app