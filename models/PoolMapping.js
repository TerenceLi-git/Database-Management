const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const PoolMappingSchema = new mongoose.Schema({
    //add requirements

    poolBarcode: {
        type: String,
        required: true,
        default: "",
    },

    testBarcode: {
        type: Array,
        required: true,
        default: "",
    },
});
PoolMappingSchema.plugin(timestamp);

const PoolMapping = mongoose.model('PoolMappings', PoolMappingSchema);
module.exports = PoolMapping