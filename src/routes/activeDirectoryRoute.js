const { Router } = require ('express')
const ActiveDirectoryController = require ('../controllers/ActiveDirectoryController')

const router = Router()

router
    .post('/login', ActiveDirectoryController.loginUser)
    .post('/reset', ActiveDirectoryController.authenticateUser, ActiveDirectoryController.resetPassword)
    .post('/fullname', ActiveDirectoryController.authenticateUser, ActiveDirectoryController.getUser)

module.exports = router