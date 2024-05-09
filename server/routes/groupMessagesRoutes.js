const express = require('express');
const { createMessages, getMessages, pinnedMessage } = require('../controllers/groupMessagesController');

const router = express.Router();

router.post('/', createMessages );
router.get('/:groupChatId', getMessages);
router.get('/pinned/:Admin/:groupChatId/:messageId', pinnedMessage);

module.exports = router;