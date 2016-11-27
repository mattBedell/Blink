const fetch = require('node-fetch');

function textSearch(req, res, next) {
  searchTerms = req.body.searchTerms;
  const API_ENDPOINT = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerms}&key=${process.env.GOOGLE_PLACES_KEY}`;
  fetch(API_ENDPOINT)
  .then((r) => r.json())
  .then((data) => {
    console.log(data);
    res.data = data;
    next();
  })
  .catch((err) => {
    console.log(`--> Google Text Search Error: ${err}`);
    next(err);
  })
}
function imgSearch(req, res, next) {
  let prevResults = res.data;
  prevResults.forEach((result) => {

  })
}
module.exports = {
  textSearch
}
