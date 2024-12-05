const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin_dash = require('../controllers/admin_controller');

router.get('/admin', auth, admin_dash);

module.exports = router;
