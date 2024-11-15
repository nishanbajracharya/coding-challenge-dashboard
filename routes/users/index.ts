import { Router } from 'express';

import { supabase } from '../../modules/supabase';

const router = Router();

router.post<{}, {}, {
    email: string;
    password: string;
}>('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const {data, error} = await supabase.auth.signInWithPassword({
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

    res.status(200).json({
        session: data.session,
        user: data.user
    });
});

export default router;
