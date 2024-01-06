
const Article = require("../services/Article")

class System {

    static async getAll(req, res) {
        try {
            const [articles, _] = await Article.findall()
            res.json({ count: articles.length, articles })

        } catch (error) {
            console.error(error)
        }
    }


    static async getArticle(req, res) {
        try {
            let id = req.params.id
            const [article, _] = await Article.findById(id)
            res.json({ article })

        } catch (error) {
            console.error(error)
        }
    }


    static async addArticle(req, res) {
        try {
            let validArticle = await Article.validArticle(req.body)

            if (validArticle.error) {
                return res.status(400).json(validArticle.error.details[0].message)
            }
            await Article.save(req.body)

            res.json({msg: 'add Article'})

        } catch (error) {
            console.error(error)

        }
    }



    static async updateArticle(req, res) {
        try {
            let id = req.params.id
            let { userID, articlename, author } = req.body
            let article = new Article(userID, articlename, author)
            article = await article.update(id)

            res.json({
                msg: 'update Article'
            })

        } catch (error) {
            console.error(error)

        }
    }


    static async delArticle(req, res) {
        try {
            let id = req.params.id
            await Article.delById(id)
            res.json({ msg: 'delete Article' })

        } catch (error) {
            console.error(error)
        }
    }



}


module.exports = System