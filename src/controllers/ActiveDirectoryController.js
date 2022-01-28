const ad = require ('../models/ActiveDirectory')
const jwt = require ('jsonwebtoken')
const authConfig = require('../config/auth.json')

class ActiveDirectoryController{

    static async loginUser(request, response){
        const { user, passwordUser} = request.body

        if(user == 'administrador' || user == 'admin'){
            return response.status(401).json({error: "Usuário ou senha incorreto"})
        }

       const authenticate = await ad.loginUser(user, passwordUser)

       if(!authenticate){
           return response.status(401).json({error: "Usuário ou senha incorreto"})
       }
       
       const token = jwt.sign({ user }, authConfig.secret, {expiresIn: "5m"})
       
       return response.status(200).json(token)
    }

    static async resetPassword(request, response){
        const { user, passwordUser } = request.body

        ad.resetPassword(user, passwordUser)

        return response.status(200).json({msg: "Senha resetada"})
    }

    static async getUser (request, response){
        const { user } = request.body

        if(user == undefined){
            return response.status(204).send('Usuário não localizado')
        }

        const fullName = await ad.getUser(user)

        return response.status(200).json(fullName)

    }

    static authenticateUser (request, response, next) {
       const token =  request.headers["x-access-token"];
       const {user} = request.body
       var decoded = jwt.verify(token, authConfig.secret);

        if (!token) {
            return response.status(401).send("A token is required for authentication");
        }

        if(decoded.user != user){
            return response.status(401).send("Invalid Token");
        }
        
        try {
            const decoded = jwt.verify(token, authConfig.secret);
            request.user = decoded
            
        } 
        catch (err) {
            return response.status(401).send("Invalid Token");
        }

        return next();
    }



}

module.exports = ActiveDirectoryController