const express = require('express');
const router = express.Router();
const { commentsController } = require('../controllers');

router.post('/create', commentsController.create.post);

router.get('/:id/read', commentsController.read.getComment);
router.get('/post/:postId/read', commentsController.read.getComments);

router.delete('/:id/remove', commentsController.remove.delete);
router.put('/:id/update', commentsController.update.put);

module.exports = router;