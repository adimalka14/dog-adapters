import { Request, Response, NextFunction } from 'express';

export async function ensureAuthenticatedMW(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: 'Unauthorized, please log in' });
    }
}
