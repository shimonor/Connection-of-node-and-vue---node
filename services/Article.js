const db = require("../config/db.js")
const Joi = require("joi")

class Article {
    constructor(userID, articlename, author) {
        this.userID = userID
        this.articlename = articlename
        this.author = author
    }

    static async findall() {
        let sql = "select * from articles"
        return await db.execute(sql)
    }

    static async findById(id) {
        let sql = "select * from articles WHERE id=?"
        return await db.execute(sql, [id])
    }

    static async save(data) {
        let sql = `INSERT INTO articles SET? `;
        const [newArticle, _] = await db.query(sql, [data])
        return newArticle
    }

    async update(id) {
        let sql = `UPDATE articles SET userID=?, articlename=?, author=? WHERE id=?`;
        return await db.execute(sql, [this.userID, this.articlename, this.author, id]);
    }

    static async delById(id) {
        let sql = "DELETE FROM `articles` WHERE id=?"
        return await db.execute(sql, [id])
    }

    static async validArticle(body) {
        let articleSchema = Joi.object({
            userID: Joi.number().required().min(0),
            articlename: Joi.string().required().min(3).max(40),
            author: Joi.string()
        })
        return articleSchema.validate(body)
    }
}


module.exports = Article
