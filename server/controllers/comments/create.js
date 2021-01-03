const { Comment } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
 
    post: async (req, res) => {
        // console.log(req.body);
        if (!req.body.contents || !req.body.postId) {
            res.status(400).json({
                data: null,
                message: "insufficient parameters supplied"
            });
        }
        if (!req.headers['authorization']) {
            res.status(403).json({ data: null, message: "invalid access token" });
        }
        const accessToken = req.headers['authorization'].split(' ')[1];
        const payload = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const newComment = await Comment.create({
            userId: payload.id,
            contents: req.body.contents,
            postId: req.body.postId,
        });
        // console.log(newComment);
        const { id, contents, userId, postId, createdAt, updatedAt } = newComment;
        res.status(201).json({
          commentData: { id, contents, userId, postId, createdAt, updatedAt },
          message: "created ok"
        });
    },

};

