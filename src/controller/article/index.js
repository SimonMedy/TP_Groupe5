const articleModel = require('../../model/article')

exports.getAll = async (req, res) => {
    return res.status(200).json({ msg: 'OK', articles: await articleModel.findAll()})
}

exports.create = async (req, res) => {
    // get body content of request
    const { name, contenu, userId } = req.body
    try {
        const article = await articleModel.create({
            name,
            contenu,
            userId
        })
        if (!article.id){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', article: article.dataValues})
        // return product.id ? res.status(200).json({ msg: 'OK', product}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.update = async (req, res) => {
    try {
        if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
        if (!req.body) return res.status(400).json({ msg: 'BAD REQUEST BODY IS REQUIRED'})
        const { name, contenu} = req.body
        const { uuid } = req.params
        const article = await articleModel.update({
            name,
            contenu,
        }, {where: { id: uuid}})
        return res.status(200).json({ msg: 'OK', article})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.delete = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        const article = await articleModel.destroy( {where: { id: uuid}})
        console.log(article)
        if (!article){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK'})
        // return product.id ? res.status(200).json({ msg: 'OK', product}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.getById = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        // const product = await productModel.findByPk(uuid)
        const article = await articleModel.findOne({
            include: [
                {
                association: 'article_belongsTo_user', // alias = as
                attributes: { exclude: [ 'createdAt', 'updatedAt', 'password' ] }
            }
            ],
            where: {id: uuid},
            attributes: {
                exclude: [
                    'createdAt'
                ]
            }
        })
        console.log(article.dataValues)
        if (!article){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', article: article.dataValues})
        // return product.id ? res.status(200).json({ msg: 'OK', product}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}
