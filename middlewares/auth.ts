import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET || '';

export function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            message: 'Unauthorized'
        });

        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            message: 'Unauthorized'
        });

        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        res.locals.auth = decoded;

        next();
    } catch (e) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
}