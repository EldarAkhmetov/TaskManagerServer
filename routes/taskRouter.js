const Router = require('express');
const taskController = require('../controllers/taskController');
const checkRole = require('../middleware/checkRoleMiddleware');

const router = new Router()

router.post('/', taskController.create);
router.get('/', taskController.getAll);
router.get('/:id', checkRole('ADMIN'), taskController.getOne);
router.put('/:id', checkRole('ADMIN'), taskController.updateOne);

module.exports = router