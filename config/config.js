
module.exports = {
    //prod
    //dev
    environment: 'dev2',

    database: {
        dbName: 'books',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456',
    },

    security: {
        secretKey: "abcdefgh",
        expiresIn: 60 * 60 * 24 * 30 // 30 day        
        // expiresIn: 60 * 60 // 一小时
    },
    wx: {
        appId: 'wxd2641263fc02071d',
        appSecret: '075ea4919cc22541d61f2acd789e94a4',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },

    yushu: {
        detailUrl: 'http://t.yushu.im/v2/book/id/%s',
        keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    }

}