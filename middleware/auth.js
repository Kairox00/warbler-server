const jwt = require("jsonwebtoken")

const loginRequired = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if (decoded){
                return next()
            }
            else{
                return next({
                    status: 401,
                    message: "You need to log in first"
                })
            }
        })
    }
    catch(err){
        console.log(err)
        return next({
                    status: 401,
                    message: "You need to log in first"
                })
    }
   
}

const ensureCorrectUser = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if (decoded && decoded.id === req.params.id) {
                return next()
            }
            else{
                return next({
                    status: 401,
                    message: "Unauthorized"
                })
            }
        })
    }
    catch(err){
        console.log(err)
        return next({
                    status: 401,
                    message: "Unauthorized"
                })
    }
}

module.exports = {loginRequired, ensureCorrectUser}