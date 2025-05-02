const express = require('express');
const {getAllData, distinctFetch, getTimeSeriesData, getBenByGender, getTrainingByDistrict, getTopicByFreq} = require('../controllers/dataController');

const router = express.Router();

router.route('/').get(getAllData);
router.route('/distinct/:field').get(distinctFetch);
router.route('/time-series').get(getTimeSeriesData);
router.route('/beneficiaries-by-gender').get(getBenByGender);
router.route('/training-by-district').get(getTrainingByDistrict);
router.route('/training-topic-frequency').get(getTopicByFreq);

module.exports = router;