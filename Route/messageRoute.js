const { Router } = require('express')
const {sendMessage, getMessages} = require('../Controllers/sendMessage')

const router = Router();

router.get('/:id', getMessages)
router.post('/send/:id', sendMessage)

module.exports = router;
