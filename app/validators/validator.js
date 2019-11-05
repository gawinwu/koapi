const { KoiValidator, Rule } = require('../../core/koi-validator')
const { User } = require('../models/user')
const { LoginType, ArtType } = require('../lib/enum')

// 正整数
class PositiveIntegerValidator extends KoiValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '不是正整数', { min: 1 })
        ]
    }
}

// 用户注册信息核验
class RegisterValidator extends KoiValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', 'Email格式不正确')
        ]
        this.password1 = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码需要数字加字母或符号的组合', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称长度至少需要4位', {
                min: 4,
                max: 32
            }),
        ]
    }

    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两次输入的密码不同')
        }
    }
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('email:' + email + '已经注册过了!')
        }
    }

}

// 用户登录 验证
class TokenValidator extends KoiValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        // 是否可以为空视身份type
        this.secret = [
            // validator.js
            new Rule('isOptional'),
            // 不为空则需要符合以下规则 
            new Rule('isLength', '至少6个字符', {
                min: 6,
                max: 128
            })
        ]

    }

    // 用户登录方式
    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必须参数')
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数错误')
        }
    }
}

// token 是否为空检测
class NotEmptyValidator extends KoiValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', {
                min: 1
            })
        ]
    }
}

function checkType(vals) {
    let type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error('type是必须参数')
    }
    type = parseInt(type)

    if (!LoginType.isThisType(type)) {
        throw new Error('type参数不合法')
    }
}

function checkArtType(vals) {
    let type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error('type是必须参数')
    }
    type = parseInt(type)

    if (!ArtType.isThisType(type)) {
        throw new Error('type参数不合法')
    }
}

class Checker {
    constructor(type) {
        this.enumType = type
    }

    check(vals) {
        let type = vals.body.type || vals.path.type
        if (!type) {
            throw new Error('type是必须参数')
        }
        type = parseInt(type)

        if (!this.enumType.isThisType(type)) {
            throw new Error('type参数不合法')
        }

    }
}
class LikeValidator extends PositiveIntegerValidator {
    constructor() {
        super()
        this.validateType = checkArtType
        // const checker = new Checker(ArtType)
        // this.validateType = checker.check.bind(checker)
    }
}


module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator
}