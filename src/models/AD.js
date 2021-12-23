const ad = require ('../controllers/activeDirectory')
const jwt = require ('jsonwebtoken')
const authConfig = require('../config/auth.json')

class ComandosAD {

    async existUser(user) {
        const response =  await ad.user(user).exists()
        
        return response
    }

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
            request.username = decoded;
        } 
        catch (err) {
            return response.status(401).send("Invalid Token");
        }

        return next();

    }

    
    async enableUser(username, response) {
    
        const userExists = await this.existUser(username)

        if(!userExists){
            return response.status(200).json({mgs: "Usuário não encontrado"})
        }
       
        ad.user(username).enable()

        return response.status(200).json({mgs: "Usuário habilitado"})
        
    }
    
    async disableUser(username, response) {
    
        const userExists = await this.existUser(username)
        
        if(!userExists){
            return response.status(200).json({mgs: "Usuário não encontrado"})
        }

        ad.user(username).disable()

        return response.status(200).json({mgs: "Usuário desabilitado"})
        
    } 

    
    async neverExpire(user){
        await ad.user(user).passwordNeverExpires();
    }
    
    async resetPassword(user, passwordUser, response){

        const userExists = await this.existUser(user)

        if(!userExists){
            return response.status(401).json({mgs: "Usuário não encontrado"})
        }

        await ad.user(user).password(passwordUser);
        
        return response.status(200).json({msg: "Senha resetada"})
    }

}

module.exports = new ComandosAD