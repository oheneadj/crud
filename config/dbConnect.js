const mongoose = require('mongoose');
const db = ""
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
