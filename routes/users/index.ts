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
    let userResponse = await supabase.auth.getUser(res.locals.token);

    if (userResponse.error) {
        res.status(userResponse.error.status || 400).json({
            message: userResponse.error.message
        });

        return;
    }

    const user = {
        id: userResponse.data.user.id,
        email: userResponse.data.user.email,
        username: '',
        fullName: '',
    }

    let profileResponse = await supabase
        .from('profiles')
        .select("*")
        .eq('id', user.id);

    if (profileResponse.error) {
        res.status(400).json({
            message: profileResponse.error.message
        });

        return;
    }

    const profile = profileResponse.data[0];

    user.username = profile.username;
    user.fullName = profile.full_name;

    res.json(user);
});

export default router;
