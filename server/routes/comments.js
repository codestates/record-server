const express = require('express');
const router = express.Router();
const { commentsController } = require('../controllers');

router.get('/:id/read', commentsController.read.getComments);
router.get('/:postId/read', commentsController.read.getComment);

router.post('/create', commentsController.create.post);
router.put('/:id/update', commentsController.update.put);
router.delete('/:id/remove', commentsController.remove.delete);

module.exports = router;