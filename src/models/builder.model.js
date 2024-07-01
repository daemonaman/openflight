const mongoose = require("mongoose");
const shortid = require("shortid");

const builderSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `builder-${shortid.generate()}`
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    operatingCities: {
        type: [String]
    },
    dealsPropType: {
        type: String
    },
    about: {
        type: String,
    },
    highlights: {
        type: String
    },
    featured: {
        type: Boolean
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: Date.now,
    },
    logo: {
        type: String
    },
    paymentAmount: {
        type: Number
    },
    paymentMode: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online'
    },
    invoiceNo: {
        type: String
    },
    invoiceDoc: {
        type: String
    }
});

const BuilderManagementModel = mongoose.model("BuilderDetails", builderSchema);

module.exports = { BuilderManagementModel };
