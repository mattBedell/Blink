const router = require('express').Router();
const { getUserProfile, getAllUsers, saveDOB } = require('./../models/userData');
const { textSearch, imgSearch } = require('./../services/googleSearch');
const { addToBucket, getBucketPending, getBucketCompleted, completeEvent, deleteEvent } = require('./../models/usersBucket');

const sendResponse = (req, res) => res.json(res.data);
const sessionErrorHandler = (err, req, res, next) => {
  console.log('no session, redirect to login');
  res.data = {redirectUrl: 'https://wid-blink.herokuapp.com/'}
  return res.json(res.data)
}
// routes for user login
router.route('/getUserData')
  .get(getUserProfile, sendResponse, sessionErrorHandler)

router.route('/getAllUsers')
  .get(getAllUsers, sendResponse)


router.route('/googleSearch')
  .post(textSearch, imgSearch, sendResponse)

router.route('/saveDOB')
  .put(saveDOB, sendResponse)
//routes for usersBucketItems
router.route('/bucket')
  .put(completeEvent, (req, res) => res.sendStatus(204))
  .post(addToBucket, (req, res) => res.sendStatus(204))
  .get(getBucketPending, getBucketCompleted, sendResponse)
  .delete(deleteEvent, (req, res) => res.sendStatus(204))


module.exports = router;
