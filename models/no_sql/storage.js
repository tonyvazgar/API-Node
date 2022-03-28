const mongoose = require("mongoose")

const StorageSchema = new mongoose.Schema(
    {
        ulr: {
            type: String
        },
        filename: {
            type: String
        },
    },
    {
        timestamps: true, //TODO createdAt, updatedAt
        versionKey: false
    }
)

module.exports = mongoose.model("storages", StorageSchema);