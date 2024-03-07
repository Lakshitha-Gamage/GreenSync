// Importing the service class
const PRCService = require("../Services/PRCService");
// const AuthService = require("../Services/authService");
// creating instances for service class
const prc = new PRCService();
// const authService = new AuthService();

class PRCController{
    // prc Registration
    async PRCRegistration (req,res) {
        try{
            // Validate the prc data and add prc to database
            await prc.PRCRegister(req.body);
            // get JWT token and
            // const token = authService.generateJWTToken(newUser.account.username, newUser.id, newUser.userRole);
            // return res.status(200).json({token:token});
            return res.status(200).json({message:"PRC Controller Works"});
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

// Export the controller
module.exports = PRCController;