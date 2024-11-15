import { Router, Request, Response } from 'express';

import { TypedRequestBody } from '../../types';
import { supabase } from '../../modules/supabase';
import { auth } from '../../middlewares/auth';

const router = Router();

router.post('/login', async (req: TypedRequestBody<{
    email: string;
    password: string;
}>, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        res.status(401).json({
            message: error.message,
            code: error.code,
            status: error.status,
        });

        return;
    }

    res.status(200).json(data.session);
});

router.get('/me', auth, async (req, res) => {
    const { data, error } = await supabase.auth.getUser(res.locals.token);

    if (error) {
        res.status(error.status || 400).json({
            message: error.message
        });

        return;
    }

    res.json(data);
});

export default router;
