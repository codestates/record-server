const express = require('express');
const router = express.Router();
const {postsController} = require('../controllers');

router.post('/create', postsController.create.post);
router.put('/:id/update', postsController.update.put);
router.delete('/:id/remove', postsController.remove.delete);

router.get('/read', postsController.read.getPosts);//랜딩페이지(처음화면)
router.get('/user/read', postsController.read.getUserPosts);//유저의 post들
router.get('/:id/read', postsController.read.getPost);//해당 id의 post한개



router.get('/search', postsController.search.get);

router.get('/:id/tags/read', postsController.tags.get);

module.exports = router;//!