const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const UsersController = require('./controllers/UsersController')

const routes = express.Router();

routes.get('/users', UsersController.getUsers)

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
        image: Joi.string().max(20).default("default.jpg")
    })
}), UsersController.addUser)



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