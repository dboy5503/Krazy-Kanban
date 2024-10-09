import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { json } from 'sequelize';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            username
        }
    });
    if (!user) {
        return res.sendStatus(401), json({ message: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.sendStatus(401), json({ message: 'Authentication failed' });
    }
    const secretKey = process.env.JWT_SECRET_KEY || 'AAAAAAGGGHH';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '3h' });
    return res.json({ token });
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
