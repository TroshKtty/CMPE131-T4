const getConnection = require('../config');

const user = {
    find_by_email: (email,callback) => {
        const connection = getConnection();
        const query = 'select * from users where email = ?';

        connection.query(query, [email], (error,results) => {
            if (error) return callback(error);
            callback(null, results[0]);
        });
    }

};

module.exports = user;