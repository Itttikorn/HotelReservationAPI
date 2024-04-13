const Review = require('../models/Review')
const Hotel = require('../models/Hotel');
const Reply = require('../models/Reply')

//@desc Get all reviews
//@route GET /api/v1/reviews
//@access Public
exports.getReviews = async (req, res, next) => {
    const queryStr = JSON.stringify(req.query);

    try {
        const reviews = await Review.find(JSON.parse(queryStr)).populate({path: 'replys'});
        res.status(200).json({ success: true, count: reviews.length, data: reviews });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

//@desc Get single review
//@route GET /api/v1/reviews/:id
//@access Public
exports.getReview = async (req, res, next) => {
    try{
        const review = await Review.findById(req.params.id);
        if(!review){
            return res.status(400).json({ success: false, message: `No review with the ID of ${req.param.id}` });
        }
        res.status(200).json({ success: true, data: review });
    }catch (err){
        res.status(400).json({ success: false, error: "Internal Server Error"  });
    }
}

//@desc Create new review
//@route POST /api/v1/hotels/:hotelId/reviews
//@access Private
exports.createReview = async (req, res, next) => {
    const hotel = await Review.create(req.body);
    res.status(201).json({
        success: true,
        data: Review
    });
}

//@desc Update review
//@route PUT /api/v1/reviews/:id
//@access Private
exports.updateReview = async (req, res, next) => {
    try{
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!review){
            return res.status(400).json({ success: false, message: `No review with the ID of ${req.param.id}` });
        }

        res.status(200).json({ success: true, data: review });
    }catch (err){
        res.status(400).json({ success: false });
    }
}

//@desc Delete review
//@route DELETE /api/v1/reviews/:id
//@access Private
exports.deleteReview = async (req, res, next) => {
    try{
        const review = await Review.findById(req.params.id);
        if(!review){
            return res.status(400).json({ success: false, message: `No review with the ID of ${req.param.id}` });
        }
        await review.deleteOne();
        res.status(200).json({ success: true, data: {} });
    }catch(err){
        res.status(400).json({ success: false });
    }
}