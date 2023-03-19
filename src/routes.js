const express = require('express');
const router = require = express.Router();

const Auth = require('./middlewares/Auth');

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const AdsController = require('./controllers/AdsController');
const { get } = require('mongoose');


router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

router.get('/states', UserController.getSates);

router.post('/user/signin', AuthController.signin);
router.post('/user/signup', AuthController.signup);

router.get('user/me', Auth.private, UserController.info);
router.put('/user/me', Auth.private, UserController.editAction);

router.get('/categories', AdsController, getCategories);

router.post('/ad/add', Auth.private, AdsController.addAction);
router.get('/ad/list', AdsController.getList);
router.get('/ad/item', AdsController.getItem);
router.put('/ad/:id', Auth.private, AdsController.editAction);

module.exports = router;