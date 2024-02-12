const express = require('express');
const router = express.Router();

const bannerController = require('../../controllers/banner/index');
const { adminAuthentication } = require('../../middlewares/authenticate');

router.post('/banner', adminAuthentication, bannerController.createBanner);
router.get('/banners', adminAuthentication, bannerController.getBanners);
router.patch('/banners/:id', adminAuthentication, bannerController.updateBanner);

module.exports = router;
