const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var FamilySchema = new Schema({
    familyName: {
        type: String
    },
    headName: {
        type: String
    },
    gender: {
        type: String
    },
    count: {
        type: Number
    },
    members: Schema.Types.Mixed
});
module.exports = mongoose.model('FamilySchema', FamilySchema);