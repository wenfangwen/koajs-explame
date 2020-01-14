import Router from 'koa-router';

const router = new Router({ prefix: '' });

import homeController from '../controller/homeController';

router.get('/', homeController.index);

router.get('/user/:username/:password', homeController.index);

module.exports = router;
