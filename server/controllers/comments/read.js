const { Comment } = require('../../models');

module.exports = {
    
    getComments: async (req, res) => {
        // console.log(req.params);
        if (!req.params.postId) {
            res.status(400).json({
                data: null,
                message: "insufficient parameters supplied"
            });
        }
        const foundComments = await Comment.findAll({
            where: {
                postId: req.params.postId
            }
        });
        // console.log(foundComments);
        const results = foundComments.map(comment => comment.dataValues);
        res.status(200).json({
          commentsData: results,
          message: "ok"
        });
    },

    getComment: async (req, res) => {
        // console.log(req.params);
        if (!req.params.id) {
            res.status(400).json({
                data: null,
                message: "insufficient parameters supplied"
            });
        }
        const foundComment = await Comment.findOne({
            where: {
                id: req.params.id
            }
        });
        // console.log(foundComment);
        const { id, contents, userId, postId, createdAt, updatedAt } = foundComment;
        res.status(200).json({
            data: {
                commentData: { id, contents, userId, postId, createdAt, updatedAt }
            },
            message: "ok"
        });
    },

};