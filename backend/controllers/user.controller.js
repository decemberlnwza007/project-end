const db = require('../models/config');

exports.getUsers = (req, res) => {
    db.query('SELECT * FROM user', (err, result) => {
        if(err) throw err;
        res.render('index', { user: result });
    });
};