// Import necessary modules
const userModel = require('../models/userModel');
const accountModel = require("../models/accountModel");
const mongoose = require("mongoose");
const CommonService = require("./commonService");
const common = new CommonService();

class UserService {
    async userRegister(userDetails){
        if (common.isPasswordValid(userDetails.account.password)) {
            userDetails.account.password = await common.hashPassword(userDetails.account.password);
        } else {
            throw new Error("Invalid password. Please ensure it meets the requirements.")
        } 
        
        // Validating Email
        if(!common.validateEmail(userDetails.account.email)) throw new Error("Invalid email. Please enter a valid email.");
        
        // Validating phone number
        const phoneNumber = common.validatePhoneNumber(userDetails.account.phoneNumber);
        if(!phoneNumber.isValid) throw new Error("Invalid phone number. Please enter valid phone number");

        // updating the data to database
        let session;
        let account
        try{
            session = await mongoose.startSession();
            session.startTransaction();
            
            try {
                account = await accountModel.create(
                    [{
                        username: userDetails.account.username,
                        phoneNumber: userDetails.account.phoneNumber,
                        userRole: userDetails.account.userRole,
                        email: userDetails.account.email,
                        password: userDetails.account.password,
                        accountStatus: "ACTIVE"
                    }], { session }
                );
            } catch(error) {
                console.error('Error creating account:', error);
                await session.abortTransaction();
                throw new Error('Error occurred when creating account');
            }
            
            try {
                await userModel.create(
                    [{  
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName,
                        profilePic: "Default", // Passing the values from frontend.. It is required to save the profile picture in server and pass the path in the db
                        address: userDetails.address,
                        account: account[0]._id
                    }], { session }
                );
                
                await session.commitTransaction();
                
            } catch (error) {
                console.error(error);
                await session.abortTransaction();
                throw new Error("Error occurred when uploading user data to database");
            }

        } catch (error){
            console.error(error);
        } finally {
            if (session) { session.endSession(); }
        }
        return account
    }
}

module.exports = UserService;