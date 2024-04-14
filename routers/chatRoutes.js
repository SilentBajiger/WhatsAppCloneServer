const express = require('express');
const { saveChatController, getAllChatsController } = require('../controllers/chatController');
const router = express.Router();

router.post('/save-chat',saveChatController);
router.post('/get-all-chats',getAllChatsController);

module.exports = router;