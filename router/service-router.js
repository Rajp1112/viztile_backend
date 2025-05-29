const express = require('express');
const router = express.Router();
const serviceForm = require('../controllers/service-controller');

router.route('/service').get(serviceForm);
module.exports = router;
