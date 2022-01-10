const ad = require ('../controllers/activeDirectory')
const jwt = require ('jsonwebtoken')
const authConfig = require('../config/auth.json')

class ComandosAD {

    async loginUser(user, passwordUser, response){
       const authenticate = await ad.user(user).authenticate(passwordUser);

       if(!authenticate){
           return response.status(401).json({error: "Usuário ou senha incorreto"})
       }
       
       const token = jwt.sign({ user }, authConfig.secret, {expiresIn: "5m"})
       
       return response.status(200).json(token)
    }

    async authenticateUser(request, response, next){
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
    
    async resetPassword(user, passwordUser, response){

        await ad.user(user).password(passwordUser);
        
        return response.status(200).json({msg: "Senha resetada"})
    }

    async getUser(user, response){
        
        if(user == undefined){
            return response.status(204).send('Usuário não localizado')
        }

        const fullName = await ad.user(user).get({ fields: ["displayName"] });

        return response.status(200).json(fullName)
    }

}

module.exports = new ComandosAD