const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getSauces); 
router.get('/:id', auth, sauceCtrl.getSauceById);
router.put('/:id', auth, multer,sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
/* router.post('/:id/like', auth, sauceCtrl.likeSauce);  */

module.exports = router;