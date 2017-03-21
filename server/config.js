// const HOST = process.env.SERVER_HOST || process.env.HOST || 'localhost';
// const PORT = process.env.SERVER_PORT || process.env.PORT || 8080;
// const ROOT = `http://${HOST}:${PORT}`;

// const CLIENT_HOST = process.env.CLIENT_HOST || 'localhost';
// const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
// const CLIENT_ROOT = `http://${CLIENT_HOST}:${CLIENT_PORT}`;

// mlab version 
// mongodb://username:password@ds137220.mlab.com:37220/easy-budget
const HOST = process.env.SERVER_HOST || process.env.HOST || 'username:password@ds137220.mlab.com';
const PORT = process.env.SERVER_PORT || process.env.PORT || '37220/easy-budget';
const ROOT = `mongodb://${HOST}:${PORT}`;

// mlab version 
// mongodb://username:password@ds137340.mlab.com:37340/easy-budget-client
const CLIENT_HOST = process.env.CLIENT_HOST || 'username:password@ds137340.mlab.com';
const CLIENT_PORT = process.env.CLIENT_PORT || '37340/easy-budget-client';
const CLIENT_ROOT = `mongodb://${CLIENT_HOST}:${CLIENT_PORT}`;

module.exports = {
    HOST,
    PORT,
    ROOT,
    CLIENT_HOST,
    CLIENT_PORT,
    CLIENT_ROOT
};

