const express = require('express')
const router = express.Router()
const passport = require('passport')

// Posts model
const Post = require('./model')

// Validators
const validatePostInput = require('./validator')

// @route   GET /api/posts
// @desc    View all posts
// @access  Public
router.get('/', (req, res) => {
  Post.find({}, {__v: 0})
    .sort({date: -1})
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      if (err) {
        res.status(404).json({error: 'Posts are unavailable'})
      }
    })
})

// @route   GET /api/posts/:postId
// @desc    View a specific post
// @access  Public
router.get('/:postId', (req, res) => {
  Post.findById(req.params.postId, {__v: 0})
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      if (err) {
        res.status(404).json({error: 'This post is unavailable'})
      }
    })
})

// @route   POST /api/posts
// @desc    Create a post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    owner: req.user.id
  })
  newPost.save().then(post => res.json(post))
})

// @route   DELETE /api/posts/:postId
// @desc    Remove a specific post
// @access  Private
router.delete(
  '/:postId',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Post.findById(req.params.postId, {__v: 0})
      .then(post => {
        if (post.owner.toString() !== req.user.id) {
          throw new Error(
            "You cannot remove this post, it doesn't belong to you"
          )
        } else {
          post.remove().then(() => res.status(200).json({success: true}))
        }
      })
      .catch(err => {
        if (err) {
          return res.status(401).json(err)
        }
      })
  }
)

// @route   POST /api/posts/like/:postId
// @desc    Like a specific post
// @access  Private
router.post(
  '/like/:postId',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Post.findById(req.params.postId)
      .then(post => {
        const index = post.likes.findIndex(
          like => like.user.toString() === req.user.id
        )
        if (index < 0) {
          post.likes.push({user: req.user.id})
          post.save().then(post => res.status(201).json(post))
        } else {
          return res.status(400).json({error: 'You already liked this post'})
        }
      })
      .catch(err => {
        if (err) {
          return res.status(400).json(err)
        }
      })
  }
)

// @route   POST /api/posts/unlike/:postId
// @desc    Unlike a specific post
// @access  Private
router.post(
  '/unlike/:postId',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Post.findById(req.params.postId)
      .then(post => {
        const index = post.likes.findIndex(
          like => like.user.toString() === req.user.id
        )
        if (index >= 0) {
          post.likes.splice(index, 1)
          post.save().then(post => res.status(201).json(post))
        } else {
          return res.status(400).json({error: "You haven't liked this post"})
        }
      })
      .catch(err => {
        if (err) {
          return res.status(400).json(err)
        }
      })
  }
)

// @route   POST /api/posts/comment/:postId
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:postId',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const {errors, isValid} = validatePostInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    Post.findById(req.params.postId)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        }

        post.comments.push(newComment)
        post.save().then(() => res.json(post)).catch(err => {
          if (err) throw new Error('Could not comment at this time')
        })
      })
      .catch(err => {
        if (err) {
          return res.status(400).json({error: 'Post not found'})
        }
      })
  }
)

// @route   DELETE /api/posts/comment/:postId/:commentId
// @desc    Remove a comment from a post
// @access  Private
router.delete(
  '/comment/:postId/:commentId',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Post.findById(req.params.postId)
      .then(post => {
        post.comments.remove({_id: req.params.commentId})
        post.save().then(post => res.status(201).json(post))
      })
      .catch(err => {
        if (err) {
          return res.status(400).json({error: "Couldn't remove that comment"})
        }
      })
  }
)
module.exports = router
