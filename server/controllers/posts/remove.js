const {Post} = require('../../models');

module.exports = {
  delete: async(req, res) => {
    Post.delete()
  }
}