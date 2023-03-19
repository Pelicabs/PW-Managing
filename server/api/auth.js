const passport = require('passport');
const express = require('express')

const AsyncRouter = require("express-async-router").AsyncRouter
var authRouter = AsyncRouter()

authRouter.get('/current-user', (req, res) => {
  if (!req.user) {
    return res.json(null)
  }

  res.json({
    email: req.user.email,
  })
})

authRouter.post('/login', (req, res) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(400).send('Invalid login')
        }
        req.login(user, () => {
            console.log(user)
            res.send()
        })
    })(req, res)
});

authRouter.post('/signup',
  passport.authenticate('local-signup'),
  function(req, res) {
    res.send()
  });

module.exports = authRouter

