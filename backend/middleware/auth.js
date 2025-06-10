import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({error: 'Access token missing' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

/*
ANY PAGE THAT SHOULD BE PROTECTED SHOULD USE THIS CODE:
I.e. settings page should use this code before being able to access it

            import { authenticateToken } from '../middleware/auth.js';

            router.get('/protected-route', authenticateToken, (req, res) => {
                res.json({ message: 'You are authenticated', user: req.user });
            });


FRONT END USE:
can also use:
    const token = localStorage.getItem('token');
    if (token) {} ...
to change the view of a webpage based on if a token exists (if a user is logged in)
*/