const express = require('express');
const { cardInfo, addCard, removeCard, addressInfo, addAddress, removeAddress, userInfo, orderInfo} = require('../controllers/userInfo_controller');
const router = express.Router();

//users cards routes
router.get('/cardInfo', cardInfo);
router.post('/addCard', addCard);
router.post('/removeCard', removeCard);

//users general info route
router.get('/', userInfo)

//users address routes
router.get('/addressInfo', addressInfo);
router.post('/addAddress', addAddress);
router.post('/removeAddress', removeAddress);

//users order info
router.get('/orderInfo', orderInfo);

module.exports = router;
