const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.DB_URL);
        console.log("Database Connected: ",connect.connection.host, connect.connection.name);
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;