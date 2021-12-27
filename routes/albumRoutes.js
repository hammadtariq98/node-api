const router = require('express').Router();
const albumList = require('./../controllers/albums.controller');

router.get('/albums',albumList.fetchAlbumList);
router.get('/album/:id', albumList.fetchAlbumById);


module.exports = { 
    albumRoutes: router
};