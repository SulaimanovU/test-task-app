const express = require('express');
const { body } = require('express-validator');
const device = require('../controllers/device');
const router = express.Router();


router.post(
    '/device',
    [
        body('user_email').isEmail(),
        body('mас').trim().not().isEmpty(),
        body('type').isIn(['ble', 'wifi', 'locator', 'wifi_rtt'])
    ],
    device.createDevice
);

router.delete('/device/:id', device.deleteDevice);

router.get('/device/:id', device.getDevice);

module.exports = router;













