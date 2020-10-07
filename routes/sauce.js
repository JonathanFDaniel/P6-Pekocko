const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.post('/', sauceCtrl.createSauce);
router.put('//:id', sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.get('/:id', sauceCtrl.getSauceById);
router.get('/', sauceCtrl.getSauces); 

module.exports = router;