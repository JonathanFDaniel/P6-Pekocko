const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getSauces); 
router.get('/:id', auth, sauceCtrl.getSauceById);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
/* router.post('/:id/like', auth, sauceCtrl.likeSauce);  */

module.exports = router;