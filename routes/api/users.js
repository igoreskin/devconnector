const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load User model
const User = require('../../models/User');


// @route   GET api/users
// desc     Test route 
// @access  Public  
router.get('/', (req, res) => {
  res.send('User route');
});

// @route   POST /api/users
// @desc    Register user
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({email}); // the same as email: email
        if(user) {
          return res.status(400).json({ errors: [{msg: 'User already exists'}] });
        } 
        // Get user's gravatar
        const avatar = gravatar.url(email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        })

        user = new User({
          name,
          email,
          avatar,
          password
        });
      // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save();
      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
        if(err) throw err;
        res.json({ token });
      })
      } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );


// @route   POST /api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req,res)  => {
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({email})
  .then(user => {
    // Check for user
    if(!user) {
      return res.status(404).json({email: 'User not found'})
    }
    // Check Password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(isMatch) {
        // User matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar } // Create JWT Payload
        // Sign Token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          })
        })
      } else {
        res.status(400).json({password: 'Password incorrect'});
      }
    })
  })
})

// @route   GET /api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({msg: 'Success'});
})

module.exports = router;