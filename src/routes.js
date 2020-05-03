const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const UsersController = require('./controllers/UsersController')
const ProductsController = require('./controllers/ProductsController')
const ProductsCategoriesController = require('./controllers/ProductsCategoriesController')

const routes = express.Router();


routes.get('/users', UsersController.getUsers)

routes.get('/users/stores', UsersController.getStores)

routes.get('/users/clients', UsersController.getClients)

routes.get('/users/id/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), UsersController.getUserById)

routes.get('/users/email/:email', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        email: Joi.string().required(),
    })
}), UsersController.getUserByEmail)

routes.post('/users/add', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(64),
        email: Joi.string().required().email().max(64),
        password: Joi.string().required().max(64),
        address: Joi.string().required(),
        document: Joi.string().max(18),
        birthday: Joi.string().min(10).max(10),
        image: Joi.string().max(20).default("default.jpg"),
        is_store: Joi.boolean().default(false)
    })
}), UsersController.addUser)


routes.get('/products', ProductsController.getProducts)

routes.get('/products/id/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), ProductsController.getProductById)

routes.get('/products/category/:category_id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        category_id: Joi.number().required(),
    })
}), ProductsController.getProductByCategory)

routes.get('/products/owner/:owner_id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        owner_id: Joi.number().required(),
    })
}), ProductsController.getProductByOwner)

routes.post('/products/add', celebrate({
    [Segments.BODY]: Joi.object().keys({
        category_id: Joi.number().required(),
        title: Joi.string().required().max(32),
        price: Joi.number().required(),
        description: Joi.string().default(""),
        image: Joi.string().max(36).default("default_product.jpg"),
        current_stock: Joi.number().default(0),
        minimun_stock: Joi.number().default(0),
        owner_id: Joi.number().required()
    })
}), ProductsController.addProduct)

routes.post('/products/update_stock/:id/:new_value', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
        new_value: Joi.number().required()
    })
}), ProductsController.updateProductStock)


routes.get('/products/categories', ProductsCategoriesController.getProductsCategories)

routes.get('/products/categories/id/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), ProductsCategoriesController.getProductCategoryById)

routes.post('/products/categories/add', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().max(32),
        description: Joi.string().required()
    })
}), ProductsCategoriesController.addProductCategory)








routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index)

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index)

routes.post('/incidents', IncidentController.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete)

module.exports = routes;