const express = require('express');
const router = express.Router();//expressさんがrouter提供してくれとんか。あざっす
const gravatar = require('gravatar');//なんかurl作成してくれてるぞ(後々詳しく)
const bcrypt = require('bcryptjs');//hash化
const jwt = require('jsonwebtoken');//jwtとはjsn使用した認可システムな
const keys = require('../../config/keys');
const passport = require('passport');

//Load User model
const User = require('../../models/User')

//@route GET api/usrss/test
//@desc Tests user routes
//@access Public
router.get('/test', (req, res) => res.json({msg: "users works"}));

//@route GET api/usrss/register
//@desc Register User
//@access Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user){
        return res.status(400).json({email: 'Email already exits' });
      }else{
        //postmanで確認すると,こんなurlできてました
        //http://localhost:5000//www.gravatar.com/avatar/70bfd54b6fdd874213174e110bf1f7db?s=200&r=pg&d=mm
        const avatar = gravatar.url(req.body.email, {
          s: '200', //size
          r: 'pg',  //rating
          d: 'mm'   //default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })

        //create hash
        bcrypt.genSalt(10, (err,salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    });
})

//@route GET api/usrss/login
//@desc Login User / returning JWT token
//@access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by Email
  User.findOne({email})
    .then(user => {
      if(!user){
        return res.status(404).json({email: 'User not found'});
      }

      //Check password(compareなんていう便利なメソッドあるんけ。。。)
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch){
            //User matched
            const payload = {
                              id: user.id,
                              name: user.name,
                              avatar: user.avatar
                            }

            //sign jsonwebtoken
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token //ここ実際に作成されるtokenな
              })
            });
          }else{
            return res.status(400).json({password: 'password incorrect'})
          }
        })
    });
})

//@route GET api/usrss/current
//@desc Return current user
//@access Private
//(このpassport.authenticateはlaravelのcontrollerでuserかどうか調べるauth機能のノリやな)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;
