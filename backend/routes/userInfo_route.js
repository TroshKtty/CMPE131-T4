const express = require('express');
const { cardInfo, addCard, removeCard, addressInfo, addAddress, removeAddress, userInfo, orderInfo} = require('../controllers/userInfo_controller');
const router = express.Router();

//get the users cards
router.get('/cardInfo', cardInfo);
router.post('/addCard', addCard);
router.post('/removeCard', removeCard);

router.get('/', userInfo)
router.get('/addressInfo', addressInfo);
router.post('/addAddress', addAddress);
router.post('/removeAddress', removeAddress);
router.get('/orderInfo', orderInfo);

module.exports = router;
