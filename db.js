//db.js
/*
const sql = require('mssql');

// Configuration for your Azure SQL Database
const config = {
    user: 'azureuser',
    password: '@Nachete02',
    server: 'myservernacho.database.windows.net',
    database: 'myDatabase',
    options: {
        encrypt: true, // For secure connections
        trustServerCertificate: false // Change this based on your security needs
    },
    pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0, // Minimum number of connections in the pool
        idleTimeoutMillis: 30000 // How long a connection is allowed to remain idle
    }
};

// Function to establish a database connection pool
async function connectDB() {
    try {
        const pool = await new sql.ConnectionPool(config).connect();
        console.log('Database connected!');
        return pool;
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err; // Rethrow the error to handle it at a higher level if needed
    }
}

module.exports = {
    connectDB
};
*/
// db.js
const sql = require('mssql');

// Configuration for your Azure SQL Database
const config = {
    user: 'azureuser',
    password: '@Nachete02',
    server: 'myservernacho.database.windows.net',
    database: 'myDatabase',
    options: {
        encrypt: true, // For secure connections
        trustServerCertificate: false // Change this based on your security needs
    },
    pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0, // Minimum number of connections in the pool
        idleTimeoutMillis: 30000 // How long a connection is allowed to remain idle
    }
};

// Function to establish a database connection pool
async function connectDB() {
    try {
        const pool = await new sql.ConnectionPool(config).connect();
        console.log('Database connected!');
        return pool;
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err; // Rethrow the error to handle it at a higher level if needed
    }
}

// Function to perform a basic database query
async function performQuery() {
    try {
        const pool = await connectDB();
        const request = pool.request();
        const result = await request.query('SELECT * FROM dbo.Users'); // Replace YourTableName with your table name
        console.log('Query results:', result.recordset); // Log the query results
        return result.recordset; // Return the query results
        
    } catch (err) {
        console.error('Error performing query:', err);
        throw err; // Rethrow the error to handle it at a higher level if needed
    }
}

module.exports = {
    connectDB,
    performQuery
};
