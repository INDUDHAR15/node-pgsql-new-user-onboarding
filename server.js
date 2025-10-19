// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { sequelize } = require('./models'); // Import sequelize instance to ensure connection
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// Middleware for parsing request bodies
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Mount the user routes
app.use('/', userRoutes); 

// Start Server and Sync Database
const startServer = async () => {
    try {
        // This ensures the table exists. Use { force: true } only for development.
        await sequelize.sync(); 
        
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`Architecture: Enterprise Sequelize MRC Pattern.`);
        });
    } catch (err) {
        console.error('Failed to start server or sync database:', err);
    }
};

startServer();