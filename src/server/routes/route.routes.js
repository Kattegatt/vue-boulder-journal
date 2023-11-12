const Router = require('express');
const router = new Router();
const routeController = require('../controller/route.controller.js');

router.post('/route', routeController.createRoute);
router.get('/route/:id', routeController.getOneRoute);
router.get('/route', routeController.getRoutes);
router.put('/route', routeController.updateRoute);
router.delete('/route/:id', routeController.deleteRoute);

module.exports = router;
