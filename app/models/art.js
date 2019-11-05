const { Movie, Sentence, Music } = require('../models/classic')

// 抽象表 ， 用于查询内容类别 
class Art {
    static async getData(art_id, type) {
        let art = null
        const finder = {
            where: {
                id: art_id
            }
        }
        switch (type) {
            case 100:
                art = await Movie.findOne(finder)
                break;
            case 200:
                art = await Music.findOne(finder)
                break;
            case 300:
                art = await Sentence.findOne(finder)
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