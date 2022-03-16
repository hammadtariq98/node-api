const router = require('express').Router();
const users = require('./../controllers/users.controller');
const passport = require('passport')
const image = require('./../Middleware/images')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


// router.post('/uploadSingleFile', upload.single('uploaded_file'), users.uploadFile);
router.post('/uploadSingleFile', image.uploadSingleFile, users.uploadFile);
router.post('/uploadMultipleFiles', upload.array("uploaded_file", 2), users.uploadMultipleFile);
router.post('/create',users.createUser);
router.put('/update/:id',users.updateUser);
router.get('/list', passport.authenticate('jwt',{ session: false }), users.getUserList);
router.delete('/delete/:id', passport.authenticate('jwt',{ session: false }), users.deleteUser);
router.post('/login', users.authenticateUser);


module.exports = { 
    userRoutes: router
};