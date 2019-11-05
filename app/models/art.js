const { Movie, Sentence, Music } = require('../models/classic')

// 抽象表 ， 用于查询内容类别 
class Art {
    static async getData(art_id, type, useScope = true) {
        let art = null
        const finder = {
            where: {
                id: art_id
            }
        }
        const scope = useScope ? 'bh' : null
        switch (type) {
            case 100:
                art = await Movie.scope(scope).findOne(finder)
                break;
            case 200:
                art = await Music.scope(scope).findOne(finder)
                break;
            case 300:
                art = await Sentence.scope(scope).findOne(finder)
                break;
            case 400:
                // art = await Moive.findOne(finder)
                break;
            default:
                break;
        }
        return art
    }
}

module.exports = {
    Art
}