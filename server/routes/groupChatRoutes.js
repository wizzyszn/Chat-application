const express = require('express');
const { createGroupChat, findGroupChat, getAllGroupsChat, addNewMembers, removeMember, deleteGroupChat } = require('../controllers/groupChatController');
const router = express.Router();

router.post('/', createGroupChat);
router.get('/find/:userId', findGroupChat);
router.get('/:userId', getAllGroupsChat);
router.patch('/addUser', addNewMembers);
router.patch('/removeUser', removeMember);
router.delete('/delete', deleteGroupChat);
module.exports = router;