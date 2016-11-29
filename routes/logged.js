const router = require('express').Router();
const session = require('express-session');
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;

function getOAuthClient (clientId, clientSecret) {
    return new OAuth2(clientId, clientSecret, 'http://localhost:3001/logged/');
}

// http://voidcanvas.com/googles-oauth-api-node-js/

const saveSeshGetDetails = (req, res) => {
    var oauth2Client = getOAuthClient(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
    var session = req.session;
    var code = req.query.code; // the query param code

    oauth2Client.getToken(code, function(err, tokens) {
      // Now tokens contains an access_token and an optional refresh_token. Save them.

      if(!err) {
        oauth2Client.setCredentials(tokens);
        //saving the token to current session
        session["tokens"]=tokens;
        res.redirect('/home')
      }else{
        console.log(err);
        res.send('Session error')
      }
    });
}



router.route('')
  .get(saveSeshGetDetails)
module.exports = router;
