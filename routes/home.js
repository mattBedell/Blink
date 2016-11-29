const router = require('express').Router();

const session = require('express-session');
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const google2 = require('googleapis').oauth2("v2");
const plus = google.plus('v1')
const {checkUser} = require('./../models/checkUser');


function getOAuthClient () {
    return new OAuth2();
}

const getUserData = (req, res, next) => {
    var oauth2Client = getOAuthClient();
    oauth2Client.setCredentials(req.session["tokens"]);

    var p = new Promise(function (resolve, reject) {
        //google2.userinfo.v2.me.get({auth: oauth2Client }, function(err, response) {
        plus.people.get({userId: 'me', auth: oauth2Client}, function(err, response) {
            resolve(response || err);
        })
    }).then((data) => {
        console.log('homeRoute Hit');
        //console.log(data);
        res.email = data.emails[0].value;
        res.profile_img = data.image.url;
        res.name = data.displayName
        next()
    })
}

router.route('/')
  .get(getUserData, checkUser, (req, res) => {
    res.redirect('/app')
    //res.redirect('http://localhost:3000');
  })



module.exports = router;
