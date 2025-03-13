import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';
import { getUsers, createUser, updateUser, deleteUser, getUserById } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
