// Importing the service class
const MCService = require("../Services/mcService");
// const AuthService = require("../Services/authService");

class MCController{
    // mc Registration
    static async MCRegistration (req,res) {
        try{
            // Validate the mc data and add mc to database
            const newMC = await MCService.MCRegister(req.body, res);
            return res.status(200).json(newMC);
        }
        catch(error){
            console.log(error);
            res.status(400).json({error:error.message})
        }
    }

    static async getAllMCUsers(req, res) {
        try {
            // Fetch all MC users from the database
            const mcUsers = await MCService.getAllMCUsers();
            return res.status(200).json({ mcUsers });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "Error occurred while fetching MC users" });
        }
    }

    static async getPendingMCUsers(req, res) {
        try {
            // Fetch all MC users from the database
            const mcUsers = await MCService.getPendingMCUsers();
            return res.status(200).json({ mcUsers });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "Error occurred while fetching Pending MC users" });
        }
    }
}

// Export the controller
module.exports = MCController;
