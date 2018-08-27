const express = require('express');
const router = express.Router();//expressさんがrouter提供してくれとんか。あざっす
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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

module.exports = router;
