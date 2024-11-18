import { Router } from 'express';

import { auth } from '../../middlewares/auth';
import { supabase } from '../../modules/supabase';
import { buildResponse } from '../../modules/responseBuilder';

const router = Router();

router.post<
  {},
  {},
  {
    email: string;
    password: string;
  }
>('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    res.status(401).json(
      buildResponse([
        {
          message: error.message,
          code: error.code,
        },
      ])
    );

    return;
  }

  res.status(200).json(buildResponse(null, data.session));
});

router.get('/me', auth, async (req, res) => {
  let userResponse = await supabase.auth.getUser(res.locals.token);

  if (userResponse.error) {
    res.status(userResponse.error.status || 400).json({
      message: userResponse.error.message,
    });

    return;
  }

  const user = {
    id: userResponse.data.user.id,
    email: userResponse.data.user.email,
    username: '',
    fullName: '',
  };

  let profileResponse = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id);

  if (profileResponse.error) {
    res.status(400).json(
      buildResponse([
        {
          message: profileResponse.error.message,
        },
      ])
    );

    return;
  }

  const profile = profileResponse.data[0];

  user.username = profile.username;
  user.fullName = profile.full_name;

  res.json(buildResponse(null, user));
});

export default router;
