const express = require('express');
const router = express.Router();//expressさんがrouter提供してくれとんか。あざっす

//@route GET api/usrss/test
//@desc Tests user routes
//@access Public
router.get('/test', (req, res) => res.json({msg: "users works"}));

module.exports = router;
