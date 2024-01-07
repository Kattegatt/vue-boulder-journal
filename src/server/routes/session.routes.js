const Router = require('express');
const router = new Router();
const sessionController = require('../controller/training_session.controller.js');

router.post('/session', sessionController.createSession);
router.get('/session/:id', sessionController.getOneSession);
router.get('/session', sessionController.getSessions);
router.put('/session', sessionController.updateSession);
router.delete('/session/:id', sessionController.deleteSession);

module.exports = router;
