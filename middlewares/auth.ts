import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET || '';

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      message: 'Unauthorized',
    });

    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({
      message: 'Unauthorized',
    });

    return;
  }

  try {
    jwt.verify(token, JWT_SECRET);

    res.locals.token = token;

    next();
  } catch (e) {
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
}

export function viewAuth(req: Request, res: Response, next: NextFunction) {
  const authCookie = req.cookies.token;

  if (!authCookie) {
    res.redirect('/login');
    return;
  }

  try {
    jwt.verify(authCookie, JWT_SECRET);

    next();
  } catch (e) {
    res.clearCookie('token');
    res.status(401).redirect('/login');
    return;
  }
}
