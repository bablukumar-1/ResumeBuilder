const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/auth');

// @route   GET /api/resumes
// @desc    Get all resumes for current user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id })
            .select('title template personalInfo lastModified createdAt updatedAt')
            .sort({ updatedAt: -1 });
        res.json({ success: true, count: resumes.length, resumes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error fetching resumes' });
    }
});

// @route   POST /api/resumes
// @desc    Create new resume
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const resumeData = { ...req.body, userId: req.user._id };
        const resume = await Resume.create(resumeData);
        res.status(201).json({ success: true, resume });
    } catch (error) {
        console.error('Create resume error:', error);
        res.status(500).json({ success: false, message: 'Server error creating resume' });
    }
});

// @route   GET /api/resumes/:id
// @desc    Get single resume
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }
        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to access this resume' });
        }
        res.json({ success: true, resume });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error fetching resume' });
    }
});

// @route   PUT /api/resumes/:id
// @desc    Update resume
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        let resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }
        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        resume = await Resume.findByIdAndUpdate(
            req.params.id,
            { ...req.body, lastModified: new Date() },
            { new: true, runValidators: true }
        );
        res.json({ success: true, resume });
    } catch (error) {
        console.error('Update resume error:', error);
        res.status(500).json({ success: false, message: 'Server error updating resume' });
    }
});

// @route   DELETE /api/resumes/:id
// @desc    Delete resume
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }
        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        await Resume.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error deleting resume' });
    }
});

// @route   POST /api/resumes/:id/duplicate
// @desc    Duplicate a resume
// @access  Private
router.post('/:id/duplicate', protect, async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }
        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        const resumeObj = resume.toObject();
        delete resumeObj._id;
        delete resumeObj.createdAt;
        delete resumeObj.updatedAt;
        resumeObj.title = `${resumeObj.title} (Copy)`;
        const newResume = await Resume.create(resumeObj);
        res.status(201).json({ success: true, resume: newResume });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error duplicating resume' });
    }
});

module.exports = router;
