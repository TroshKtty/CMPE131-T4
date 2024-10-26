const bcrypt = require('bcrypt');
const User = require('../models/auth_model');


const register = async(req, res) => {
    const {email, username, password,phone, role} = req.body;
    console.log('Controller',phone);
    try{
        const user_check = await User.find_user(username)
        if(user_check.length != 0){
            return res.status(409).json({message: 'Username already taken. Please select a different username.'});
        }

        const hashed_password = await bcrypt.hash(password,10);

        let approved = false;
        if (role == 'Customer')
            approved = true;

        await User.create({
            email,
            username,
            hashed_password,
        phone,
            role,
            approved
        });
        if(role === 'Customer')
            res.status(200).json({message: 'Registration Successfull. Have fun shopping!'});
        else
            res.status(200).json({message: 'Approval from Admin/Employee Pending. Contact proper supervisor for approval'});
    }
    catch(err){
        console.error(err);
        res.json({message: 'Some shit went wrong in controller'});
    }

};

//const login = async(req, res) => {};

module.exports = register;