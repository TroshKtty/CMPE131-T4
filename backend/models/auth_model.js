const getConnection = require('../config');
const bcrypt = require('bcrypt');
require('dotenv').config();


const connection = getConnection();

const User = {
    //create user
    create({ email, username, hashed_password, phone, role, approved }) {
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO users (email, username, hashed_password, created_at, phone_no, role, approved) VALUES (?, ?, ?, NOW(), ?, ?, ?)',
                [email, username, hashed_password, phone, role, approved],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    },

    //find user
    find_user (username) {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM users WHERE username = ?',
                [username],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });
    },

    async check_credentials(username, password){
        try {
            const user = await this.find_user(username); // await the promise to resolve
                       
            const password_check = await bcrypt.compare(password, user[0].hashed_password); // await bcrypt comparison

            if (password_check) {
                return user;
            } else {
                throw error;
            }
        } catch (error) {
            return null;
        }
    }
}

module.exports = User;
