const Tags = require('../models/Tags');
const { merge } = require('../utils/utils');

//@desc Get all tags
//@route GET /api/v1/hotels/tags
//@access Public
exports.getTags = async (req, res, next) => {
    try {
        const tags = await Tags.findOne({});
        res.status(200).json({ success: true, data: tags });
    } catch (err) {
        res.status(400).json({ success: false });
    }
}

//@desc Create new tag
//@route POST /api/v1/hotels/tags
//@access Private
exports.createTags = async (req, res, next) => {
    try {
        const tags = await Tags.findOne({});
        if (tags) {
            tags.tags = merge(tags.tags, req.body.tags);
            const _tags = await Tags.findOneAndUpdate({}, tags);
            res.status(201).json({
                success: true,
                data: tags
            });
        } else {
            const tags = await Tags.create(req.body);
            res.status(201).json({
                success: true,
                data: tags
            });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false });
    }
}