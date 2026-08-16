const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

async function testConnection() {
    console.log('--- Database Connection Test Script ---');

    // Manual .env parsing
    const envPath = path.resolve(process.cwd(), '.env');
    let uri = '';

    try {
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const match = envContent.match(/MONGODB_URI=(.+)/);
            if (match && match[1]) {
                uri = match[1].trim();
                console.log('✅ Found MONGODB_URI in .env');
            } else {
                console.error('❌ MONGODB_URI not found in .env');
                process.exit(1);
            }
        } else {
            console.error('❌ .env file not found');
            process.exit(1);
        }
    } catch (err) {
        console.error('❌ Error reading .env file:', err.message);
        process.exit(1);
    }

    console.log('Attempting to connect to MongoDB Atlas...');

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
        });
        console.log('✅ Connection SUCCESSFUL!');
        console.log('The issue is likely NOT with your network.');
        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Connection FAILED');
        console.error('Error Name:', error.name);
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);

        if (error.name === 'MongooseServerSelectionError') {
            console.error('\nDiagnosing:');
            console.error('- Only your IP address is likely blocked.');
            console.error('- Or your firewall is blocking port 27017.');
        }
    }
}

testConnection();
