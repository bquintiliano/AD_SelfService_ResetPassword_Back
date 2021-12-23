const { Router } = require ('express')
const path = require ('path')
const AD = require ('../models/AD')

const router = Router()

router.post("/login", (request, response) => {
    const { user, passwordUser} = request.body

    AD.loginUser(user, passwordUser, response)
    
})

router.post("/disable", AD.authenticateUser, (request, response) => {
    const { user } = request.body
    console.log(user)
    AD.disableUser(user, response)
    
})

router.post("/enable", (request, response) => {
    const { user } = request.body
    
    AD.enableUser(user, response)
    
})

router.post("/reset", AD.authenticateUser, (request, response) => {
    const { user, passwordUser } = request.body
    
    AD.resetPassword(user, passwordUser, response)
    
})


module.exports = router