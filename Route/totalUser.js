const getUser = require('../Controllers/uesr');

const {Router}  = require('express');
const { route } = require('./messageRoute');

const router = Router();

router.get('/', getUser);

module.exports = router;