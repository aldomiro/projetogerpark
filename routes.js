const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const moradorController = require('./src/controllers/moradorController');

const { loginRequired} = require('.src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

//Rotas de longin
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.post('/login/logout', loginController.logout);

//Rotas de Morador
route.get('/morador/index',loginRequired, moradorController.index);
route.post('/morador/register',loginRequired, moradorController.register);


module.exports = route;
