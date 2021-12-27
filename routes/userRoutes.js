const router = require('express').Router();
const users = require('./../controllers/users.controller');

router.post('/create',users.createUser);

module.exports = { 
    userRoutes: router
};