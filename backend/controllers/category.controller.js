const db = require('../models/config');

exports.getCategory = (req, res) => {
    console.log("Fetching categories...");
    db.query('SELECT * FROM menu_category', (err, result) => {
        if (err) throw err;
        res.render('category', { category: result });
    });
};


exports.uploadCategoryImage = (req, res) => {
    if(req.file)
    {
        console.log('Uploaded File', req.file);
        res.send('File uploaded successfully');
    }
    else
    {
        res.send('Failed to upload file');
    }
};