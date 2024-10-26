const getConnection = require('../config');
const bcrypt = require('bcrypt');

const connection = getConnection();

const User = {
    //create user
    create({ email, username, hashed_password, phone, role, approved }) {
        console.log('Model', phone);
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
    find_user(username) {
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
    }
};

module.exports = User;
