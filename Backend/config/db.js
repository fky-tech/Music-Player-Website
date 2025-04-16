// import mongoose, { Connection } from "mongoose";
import mongoose from "mongoose";
import mysql from 'mysql2';

// MongoDB Connection
export const DB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


// MySql Connection
const mySqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
})

mySqlConnection.connect(err => {
    if (err) {
        console.error("Connection error:", err.message);
        return;
    }
    console.log("Mysql Connected");
});

export default mySqlConnection;