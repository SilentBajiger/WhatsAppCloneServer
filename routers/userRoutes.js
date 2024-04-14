const express = require('express');
const { signInController, getAllUsersController } = require('../controllers/userController');
// const { saveChatController } = require('../controllers/chatController');
const router = express.Router();


router.post('/signin',signInController);
router.get('/get-all-users/:id',getAllUsersController);
// router.post('/save-chat',saveChatController);

module.exports = router;