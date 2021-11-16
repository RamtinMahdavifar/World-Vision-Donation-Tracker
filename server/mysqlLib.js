const mysql = require("mysql");

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
});

/**
 * Get the connection to the database
 * @param callback The function to be called when connected to the database
 */
function getConnection(callback) {
    pool.getConnection((err, con) => {
        if (err) {
            callback(err, con);
            return;
        }

        try {
            callback(null, con);
        } finally {
            con.release();
        }
    });
}

/**
 * Create tables in the database if not exist
 * @param callback function to be called after the initialization
 */
exports.init = (callback) => {
    getConnection((err, con) => {
        if (err) {
            callback(err);
            return;
        }

        con.query("CREATE TABLE IF NOT EXISTS Staff (" +
            "userId VARCHAR(255) NOT NULL PRIMARY KEY, " +
            "firstName VARCHAR(255) NOT NULL, " +
            "lastName VARCHAR(255) NOT NULL, " +
            "middleName VARCHAR(255))", err => {
            if (err) {
                console.error("Failed to create table Staff");
                throw err;
            }
        });

        con.query("CREATE TABLE IF NOT EXISTS Customer (" +
            "userId VARCHAR(255) NOT NULL PRIMARY KEY, " +
            "firstName VARCHAR(255) NOT NULL, " +
            "lastName VARCHAR(255) NOT NULL, " +
            "middleName VARCHAR(255))", err => {
            if (err) {
                console.error("Failed to create table Customer");
                throw err;
            }
        });

        con.query("CREATE TABLE IF NOT EXISTS Recipient (" +
            "userId VARCHAR(255) NOT NULL PRIMARY KEY, " +
            "description VARCHAR(2000) NOT NULL, " +
            "firstName VARCHAR(255) NOT NULL, " +
            "middleName VARCHAR(255), " +
            "lastName VARCHAR(255) NOT NULL, " +
            "birthDate DATE NOT NULL, " +
            "gender VARCHAR(10) NOT NULL)", err => {
            if (err) {
                console.error("Failed to create table Recipient");
                throw err;
            }
        });

        con.query("CREATE TABLE IF NOT EXISTS Address (" +
            "userId VARCHAR(255) NOT NULL PRIMARY KEY, " +
            "street VARCHAR(255) NOT NULL, " +
            "city VARCHAR(255) NOT NULL, " +
            "province VARCHAR(255) NOT NULL, " +
            "postalCode VARCHAR(255) NOT NULL, " +
            "country VARCHAR(255) NOT NULL)", err => {
            if (err) {
                console.error("Failed to create table Address");
                throw err;
            }
        });

        con.query("CREATE TABLE IF NOT EXISTS AccountType (" +
            "userId VARCHAR(255) NOT NULL PRIMARY KEY, " +
            "type VARCHAR(30) NOT NULL)", err => {
            if (err) {
                console.error("Failed to create table AccountType");
                throw err;
            }
        });

        con.query("CREATE TABLE IF NOT EXISTS Card (" +
            "userId VARCHAR(255) NOT NULL PRIMARY KEY, " +
            "number VARCHAR(30) NOT NULL, " +
            "expirationDate DATE NOT NULL, " +
            "cvv VARCHAR(10) NOT NULL)", err => {
            if (err) {
                console.error("Failed to create table Card");
                throw err;
            }
        });

        con.query("CREATE TABLE IF NOT EXISTS Donation (" +
            "id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
            "recipientUserId VARCHAR(255) NOT NULL, " +
            "customerUserId VARCHAR(255) NOT NULL, " +
            "monthlyTransactionAmount FLOAT NOT NULL, " +
            "nextTransactionDate DATE NOT NULL)", err => {
            if (err) {
                console.error("Failed to create table Donation");
                throw err;
            }
        });

        con.query("CREATE TABLE IF NOT EXISTS Transaction (" +
            "id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
            "recipientUserId VARCHAR(255) NOT NULL, " +
            "customerUserId VARCHAR(255) NOT NULL, " +
            "amount FLOAT NOT NULL, " +
            "timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", err => {
            if (err) {
                console.error("Failed to create table Transaction");
                throw err;
            }
        });

        callback(null);
    });
}

exports.getConnection = getConnection;
exports.escape = mysql.escape;