import {Router} from 'express';

import userRoutes from './users';

const router = Router();

router.get('/', (_, res) => {
    res.json({
        name: 'api',
        status: 'success'
    });
});

router.use('/users', userRoutes);

export default router;
