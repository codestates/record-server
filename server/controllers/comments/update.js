const { Comment } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    put: async (req, res) => {
        // console.log(req.body);
        // console.log(req.params);
        if (!req.params.id || !req.body.contents || !req.body.postId) {
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
        const foundComment = await Comment.findOne({
            where: {
                id: req.params.id,
                userId: payload.id
            }
        });
        // console.log(foundComment);
        if (!foundComment) {
            res.status(404).json({
                data: null,
                message: "not found comment"
            });
        } else {
            const updatedComment = await Comment.update(
                {
                    contents: req.body.contents,
                    userId: req.body.userId,
                    postId: req.body.postId
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );
            // console.log(updatedComment);
            const { id, contents, userId, postId, created_at, updated_at } = updatedComment;
            res.status(200).json({
                data: {
                    commentData: { id, contents, userId, postId, created_at, updated_at }
                },
                message: "updated ok"
            });
        }
    },

};