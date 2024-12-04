const express = require('express');
const { cardInfo, addCard, removeCard} = require('../controllers/userInfo_controller');
const router = express.Router();

//get the users cards
router.get('/cardInfo', cardInfo);
router.post('/addCard', addCard);
router.post('/removeCard', removeCard);

//get the users address
/*router.get('/addressInfo', addressInfo);
router.post('/addAddress', addAddress);
*/
module.exports = router;
