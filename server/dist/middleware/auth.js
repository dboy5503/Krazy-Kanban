import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY || 'AAAAAAGGGHH';
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                res.sendStatus(403);
                return;
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
