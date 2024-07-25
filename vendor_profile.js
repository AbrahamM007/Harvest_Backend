const mongoose = require('mongoose');//require dependencies

const schema = new mongoose.Schema(
    {
        ShopName: {type: String, default: ""},
        VendorName: {type: String, default: ""},
        ShopPhoto: {type: String, default: ""},
        Description: {type: String, default: ""},
        FoodsSold: {type: String, default: ""},
        Freshness: {type: String, default: ""},
        Location: {type: String, defalt: ""}
    },
    { //metadata
        timestamps: {
            createdAt: "createdOn",
            updatedAt: "updatedOn"
        },
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
); //template for the data being stored in mongodb cluster

const ProfileModel = mongoose.model('vendor_profiles', schema);

module.exports = ProfileModel;