const router = require('express').Router();
const session = require('express-session');
const google = require('googleapis');
const gmail = google.plus('v1');
const OAuth2 = google.auth.OAuth2;

// http://voidcanvas.com/googles-oauth-api-node-js/

function getOAuthClient (clientId, clientSecret) {
    return new OAuth2(clientId, clientSecret, 'https://wid-blink.herokuapp.com/logged/');
}
function getAuthUrl (clientId, clientSecret) {
  //http://stackoverflow.com/questions/36586539/with-the-npm-package-googleapis-how-do-i-get-the-users-email-address-after-auth
    var oauth2Client = getOAuthClient(clientId, clientSecret);
    var scopes = [
      'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/plus.login'
    ];
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent' // If you only need one scope you can pass it as string
    });

    return url;
}


const createUrl = (req, res, next) => {
  let myurl = getAuthUrl(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
  //console.log(myurl);
  res.authurl = myurl;
  next();
}
router.route('/')
  .get(createUrl, (req, res) => {
    res.send(`${res.authurl}`)
  })

module.exports = router;
