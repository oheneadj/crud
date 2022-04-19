const mongoose = require('mongoose');
const db = "mongodb+srv://techspotlabs:kuzco555@techspotlabscluster.k06vf.mongodb.net/dummyapi"
const dbConnect = async () => {
    try {
        await mongoose.connect(db);
        console.log("Database connected successfully 🍜")
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = { dbConnect };