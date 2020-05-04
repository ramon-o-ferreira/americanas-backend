const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate')

const UsersController = require('./controllers/UsersController')
const OrdersController = require('./controllers/OrdersController')
const ProductsController = require('./controllers/ProductsController')
const ProductsCategoriesController = require('./controllers/ProductsCategoriesController')
const DistanceController = require('./controllers/DistanceController')
const ShoppingCartController = require('./controllers/ShoppingCartController')

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


routes.get('/orders', OrdersController.getOrders)

routes.get('/orders/client_id/:client_id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        client_id: Joi.number().required(),
    })
}),OrdersController.getOrderByClient)

routes.get('/orders/store_id/:store_id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        store_id: Joi.number().required(),
    })
}),OrdersController.getOrderByStore)

routes.get('/orders/status/:status', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        status: Joi.string().required().max(9),
    })
}),OrdersController.getOrderByStatus)

routes.post('/orders/add', celebrate({
    [Segments.BODY]: Joi.object().keys({
        client_id: Joi.number().required(),
        store_id: Joi.number().required(),
        order_list: Joi.string().required()
    })
}), OrdersController.addOrder)

routes.delete('/orders/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), OrdersController.deleteOrder)


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


routes.get('/cart/:client_id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        client_id: Joi.number().required(),
    })
}), ShoppingCartController.getCartByClient)

routes.post('/cart/add', celebrate({
    [Segments.BODY]: Joi.object().keys({
        client_id: Joi.number().required(),
        store_id: Joi.number().required(),
        product_id: Joi.number().required(),
        quantity: Joi.number().default(1)
    })
}), ShoppingCartController.addItemToCart)

routes.post('/cart/update_quantity', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
        quantity: Joi.number().required()
    })
}), ShoppingCartController.updateQuantity)

routes.delete('/cart/delete_by_id/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), ShoppingCartController.deleteItemById)

routes.delete('/cart/delete_by_client/:client_id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        client_id: Joi.number().required(),
    })
}), ShoppingCartController.deleteItemByClient)


routes.post('/distance', celebrate({
    [Segments.BODY]: Joi.object().keys({
        from: Joi.string().required(),
        to: Joi.string().required()
    })
}), DistanceController.getDistance)

module.exports = routes;