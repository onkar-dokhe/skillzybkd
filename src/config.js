// Configuration settings for the project
const projectConfig = {
    app: {
        port: parseInt(process.env.PORT) || 3001, // Port on which the server will run
    },
    db: { 
        url: process.env.MONGODB_URI || 'mongodb://localhost:27017/skillzy', // MongoDB connection URL
    },
    jwt: {
        key: process.env.JWT_SECRET_KEY || 'secret', // Secret key for JWT (JSON Web Tokens)
        expire: process.env.JWT_COOKIE_EXPIRES_IN || '30d', // JWT expiration duration
    },
    frontend: {
        baseUrl: process.env.FRONTEND_BASE_URL || 'http://localhost:3000', // Base URL for the frontend
    },
    email: {
        address: process.env.EMAIL_ADDRESS || '',
        password: process.env.EMAIL_PASSWORD || '',
    },
    challenge: {
        questionCount: parseInt(process.env.CHALLENGE_QUESTIONS_COUNT) || 5,
    }
};

// Export the project configuration object
module.exports = projectConfig;
