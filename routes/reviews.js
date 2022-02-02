const express = require('express');
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const reviews = require('../controllers/reviews');
const router = express.Router({mergeParams: true});


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;