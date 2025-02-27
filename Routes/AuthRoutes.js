

const express = require('express');
const { signupParent, login , submitReclamation } = require('../Controllers/AuthController');
const router = express.Router();

router.post('/signup/parent', signupParent);
router.post('/login', login);
router.post('/reclamation', submitReclamation);

module.exports = router;
