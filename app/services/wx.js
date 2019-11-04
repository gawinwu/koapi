const util = require('util')
const axios = require('axios')

const { User } = require('../models/user')
const { generateToken } = require('../../core/utils/util')
const { Auth } = require('../../middlewares/auth')

class WXManager {

    //https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
    static async codeToToken(code) {
        // code 小程序生成 
        // openid 用户在本小程序的唯一标识
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code
        )
        // console.log(url)
        //
        const result = await axios.get(url)
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if (errcode) {
            throw new global.errs.AuthFailed('openid获取失败:' + errcode + '; msg:' + errmsg)
        }
        console.log(result.data.openid)
        let user = await User.getUserByOpenid(result.data.openid)
        if (!user) {
            user = await User.registerByOpenid(result.data.openid)
        }

        return generateToken(user.id, Auth.USER)

    }
}

module.exports = {
    WXManager
}