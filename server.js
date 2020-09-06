const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const familyRoutes = express.Router();

const PORT = 4000;
var Family = require('./Modals/family.modal');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

familyRoutes.route('/').get(function (req, res) {
    console.log("family req", req);
    Family.find(function (err, family) {
        if (err) {
            console.log(err)
        } else {
            console.log("Data fetched"); // Success
            res.json(family);
        }
    })
});

familyRoutes.route('/:id').get(function (req, res) {
    var id = req.params.id;
    Family.findById(id, function (err, family) {
        res.json(family);
    });
});

familyRoutes.route('/delete/:id').delete(function (req, res) {
    console.log("family req", req.params.id);
    Family.deleteOne({_id: req.params.id}).then(function () {
        console.log("Data deleted"); // Success
        res.status(201).json({'family': 'family deleted successfully'});
    }).catch(function (error) {
        console.log(error); // Failure
    });
});


familyRoutes.route('/add').post(function (req, res) {
    var family = new Family(req.body);
    family.save().then(function (family) {
        res.status(200).json({'family': 'family added successfully'});
    }).catch(function (err) {
        res.status(400).send('adding new family failed');
    });
});


familyRoutes.route('/update/:id').post(function (req, res) {
    Family.findById(req.params.id, function (err, family) {
        if (!family) {
            res.status(404).send("data is not found");
        }
        else {
            console.log(req.body);
            family.count = req.body.count;
            family.members = req.body.members;
            family.save().then(function (family) {
                console.log(family);
                res.json('Family updated!');
            }).catch(function (err) {
                res.status(400).send("Update not possible");
            });
        }
    });
});

app.use('/family', familyRoutes);
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});