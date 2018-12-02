const express = require('express')
const Router = express.Router
const router = Router()
const { Post } = require('../models/Post')

router.get('/', async (req, res, next) => {
  try {
    const docs = await Post.find().populate('user')
    res.status(200).send({
      data: docs
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:post_id', async (req, res, next) => {
  // 1. Get post id from params
  const { post_id } = req.params
  try {
    // 2. Look up individual post by post id
    const doc = await Post.findById(post_id).populate('user').populate('comments.user')
    // 4. If successful send back success response
    res.status(200).send({
      data: [doc]
    })
  } catch (e) {
    // 3. If this fails, handle error
    next(e)
  }
})

// DELETE !!!
router.delete('/:post_id', async(req, res, next) => {
  // 1. get the post id from the request params
  const { post_id } = req.params
  // 2. Look up a post in our database by this request ID
  try {
    // 3. If we find the post, delete it
    const doc = await Post.findByIdAndRemove(post_id)
    res.status(204).send({ data: [doc] })
  } catch(e) {
    // 4. If cannot find post, pass error to error handler
    next(e)
  }
})

module.exports = router
