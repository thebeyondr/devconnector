const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Routes
const users = require('./users/routes')
const posts = require('./posts/routes')
const profiles = require('./profiles/routes')

// DB Config
const db = require('./config/keys').mongoURI

// Connect DB
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log('> Database connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.status(200).json('Working'))

// Use Routes
app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use('/api/posts', posts)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`> Listening on port ${PORT}`)
})
