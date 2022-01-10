const { Router } = require ('express')
const path = require ('path')
const AD = require ('../models/AD')

const router = Router()

router.post("/login", (request, response) => {
    const { user, passwordUser} = request.body

    AD.loginUser(user, passwordUser, response)
    
})

router.post("/reset", AD.authenticateUser, (request, response) => {
    const { user, passwordUser } = request.body
    
    AD.resetPassword(user, passwordUser, response)
    
})

router.post("/fullname",AD.authenticateUser, (request, response) => {
    const { user } = request.body
    
    AD.getUser(user, response)
    
})


module.exports = router