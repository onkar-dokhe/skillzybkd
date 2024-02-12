const Banner = require("../../models/banner");
const { createBannerValidation, updateBannerValidation } = require("../../validations/banner");

const createBanner = async (req, res) => {
    try {
        const validation = createBannerValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }

        const result = await Banner.create(req.body);
        if (!result) {
            return res.status(400).json({ success: false, message: 'Failed to add a banner' });
        }
        const resp = {
            success: true,
            data: result,
        };
        res.status(201).send(resp);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
    }
};

const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const validation = updateBannerValidation(req.body);
        if (validation.error || !id) {
            return res.status(422).json({ success: false, message: !id ? 'Provide a valid question id' : validation.error.details[0].message });
        }

        const result = await Banner.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (!result) {
            return res.status(400).json({ success: false, message: 'Failed to update' });
        }
        const resp = {
            success: true,
            data: result,
        };
        res.status(201).send(resp);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
    }
};

const getBanners = async (req, res) => {
    try {
        const questions = await Banner.find({});
        const resp = {
            success: true,
            data: questions,
        };
        return res.json(resp);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
    }
};

module.exports = { createBanner, getBanners, updateBanner, };
