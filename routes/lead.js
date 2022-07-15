const express = require('express');
const router = express.Router();
const {
  postNewLead,
  getAllLeads,
  deleteLead,
  getOneLead,
  updateLead,
} = require('../controllers/Lead');
router.route('/new').post(postNewLead);
router.route('/all').get(getAllLeads);
router.route('/:id').delete(deleteLead).get(getOneLead).put(updateLead);
module.exports = router;
