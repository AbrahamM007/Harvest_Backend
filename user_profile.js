const mongoose = require('mongoose');//require dependencies

const schema = new mongoose.Schema(
    {
        ShopName: {type: String, default: ""},
        VendorName: {type: String, default: ""},
        ShopPhoto: {type: String, default: ""},
        Description: {type: String, default: ""},
        FoodsSold: {type: String, default: ""},
        Freshness: {type: String, default: ""},
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

const UserProfile = mongoose.model('user_profiles', schema);

module.exports = UserProfileProfile;