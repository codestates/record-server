const express = require('express');
const router = express.Router();
const {postsController} = require('../controllers');

router.post('/create', postsController.create.post);
router.put('/:id/update', postsController.update.put);
router.delete('/:id/remove', postsController.remove.delete);
router.post('/search', postsController.search.post);
router.post('/tags', postsController.tags.post);
router.post('/imageurl/create', postsController.imageurlcreate.post);
router.post('/:id/imageurl/remove', postsController.imageurlremove.post);