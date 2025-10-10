// server/config.js
const config = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
};

export default config;
