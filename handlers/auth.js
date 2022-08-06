const db = require("../models")
const jwt = require("jsonwebtoken")

const signin = async (req, res, next)=>{
    try {
        let user = await db.User.findOne({
            email: req.body.email
        })
        console.log(user)
        let {id, username, profileImageUrl} = user
        let isMatch = await user.comparePassword(req.body.password)
        if (isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY)

            res.status(200).send({
                id, 
                username,
                profileImageUrl,
                token
            })
        }
        else{
            return next({
                status: 400,
                message: 'Invalid/email password'
            })
        }

    }
    catch(err){
        console.log(err)
        return next({
                status: 400,
                message: 'Invalid/email password'
            })
    }
}

const signup = async (req, res, next) =>{
    try {
        let user = await db.User.create(req.body)
        let {id, username, profileImageUrl} = user
        let token = jwt.sign({
            id, 
            username,
            profileImageUrl
        },process.env.SECRET_KEY)
        res.status(200).send({
            id,
            username, 
            profileImageUrl, 
            token
        })
    }
    catch(err){
        if(err.code === 11000){
            err.message = "Sorry username or email already taken"
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

module.exports = {signup, signin}