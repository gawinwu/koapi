
module.exports = {
    //prod
    //dev
    environment: 'dev',

    database: {
        dbName: 'books',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456',
    },

    security: {
        secretKey: "abcdefg",
        expiresIn: 60 * 60 * 24 * 30 // 30 day        
        // expiresIn: 60 * 60 // 一小时
    },
}