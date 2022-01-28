const ad = require ('./activeDirectoryConnection')

class activeDirectory{

    static async loginUser(user, passwordUser){
        const authenticate =  await ad.user(user).authenticate(passwordUser)
        return authenticate
    }

    static async resetPassword(user, passwordUser){
        const resetPassword = await ad.user(user).password(passwordUser)
        return resetPassword
    }

    static async getUser(user){
        const fullName = await ad.user(user).get({ fields: ["displayName"] })
        return fullName
    }

}

module.exports = activeDirectory

