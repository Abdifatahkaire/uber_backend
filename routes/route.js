const express=require('express');
const router=express.Router();
const controllers=require('../controllers/controllers');
const auth = require('../middleware/auth');


router.get('/',controllers.afficherAllUser);


router.get('/:email',controllers.getUser);

router.post('/',controllers.createUser);

router.put('/update/:email',auth,controllers.updateUser);

router.post('/signin',controllers.login);

module.exports=router;

