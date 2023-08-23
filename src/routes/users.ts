import express, {Request, Response} from 'express';
const router = express.Router();
import {createUser} from '../controllers/userController';

/* GET users listing. */
router.get('/', function(req:Request, res:Response, next) {
  res.send('respond with a resource');
});


router.post('/signup', createUser);
router.post('/login', createUser);

export default router;
