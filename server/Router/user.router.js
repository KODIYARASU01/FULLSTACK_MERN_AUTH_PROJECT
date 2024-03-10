import express from 'express';
import { getUser,updateUser,deleteUser } from '../Controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

let router=express.Router();
router.get('/',getUser);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
export default router;
