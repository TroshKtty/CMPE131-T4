const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/auth_model');


const register = async(req, res) => {
    const {email, username, password,phone, role} = req.body;
    try{
        if(role!='Customer' && role!='Admin' && role!='Employee')
            return res.status(400).json({message: 'Invalid Role entered'});

        const user_check = await User.find_user(username);
        
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
        res.json({message: 'Some shit went wrong in register_controller'});
    }

};

const login = async(req, res) => {
    const {username, password} = req.body;
    const secret_key = process.env.JWT_secret;
    try{

        const user_check = await User.check_credentials(username, password)
        if(user_check == null){
            return res.status(401).json({message: 'Username or password Invalid'})
        }

        if(user_check.approved == 0)
            return res.status(200).json({message: 'Approval from Admin/Employee Pending. Contact proper supervisor for approval'});
        
        const jwt_token = jwt.sign({user_id: user_check.user_id, role: user_check.role}, 
            secret_key, 
            {expiresIn: '1h'}
        );
        
        res.cookie('token', jwt_token, { httpOnly: true, secure: true, maxAge: 3600000 });

        res.status(200).json({message: 'Login Successful', role: user_check.role});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Something went wrong in login_controller'})
    }
};

module.exports = {register, login};