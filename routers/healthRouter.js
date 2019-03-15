const express = require('express')
var router = express.Router()
const healthController = require('../controllers/healthcheck')

router.get('/',healthController.healthCheckApi)
module.exports = router;