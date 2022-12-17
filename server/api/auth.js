const express = require('express')

const router = express.Router()

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.send()
  });

module.exports = router

