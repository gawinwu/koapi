const { KoiValidator, Rule } = require('../../core/koi-validator')

// 正整数
class PositiveIntegerValidator extends KoiValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '不是正整数', { min: 1 })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator
}