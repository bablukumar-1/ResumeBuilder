const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    company: { type: String, default: '' },
    position: { type: String, default: '' },
    location: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    current: { type: Boolean, default: false },
    description: { type: String, default: '' }
}, { _id: true });

const EducationSchema = new mongoose.Schema({
    institution: { type: String, default: '' },
    degree: { type: String, default: '' },
    field: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    gpa: { type: String, default: '' },
    description: { type: String, default: '' }
}, { _id: true });

const SkillSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
    category: { type: String, default: 'Technical' }
}, { _id: true });

const ProjectSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    techStack: [{ type: String }],
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' }
}, { _id: true });

const CertificationSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    issuer: { type: String, default: '' },
    date: { type: String, default: '' },
    expiryDate: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
    credentialId: { type: String, default: '' }
}, { _id: true });

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Resume title is required'],
        default: 'My Resume',
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    template: {
        type: String,
        enum: ['modern', 'classic', 'creative', 'professional', 'minimal', 'bold', 'elegant', 'executive', 'developer'],
        default: 'modern'
    },
    personalInfo: {
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        jobTitle: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        address: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        country: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        website: { type: String, default: '' },
        profilePhoto: { type: String, default: '' }
    },
    summary: { type: String, default: '' },
    experience: [ExperienceSchema],
    education: [EducationSchema],
    skills: [SkillSchema],
    projects: [ProjectSchema],
    certifications: [CertificationSchema],
    fontSettings: { type: mongoose.Schema.Types.Mixed, default: {} },
    isPublic: { type: Boolean, default: false },
    lastModified: { type: Date, default: Date.now }
}, { timestamps: true });

// Update lastModified on save
ResumeSchema.pre('save', function (next) {
    this.lastModified = new Date();
    next();
});

module.exports = mongoose.model('Resume', ResumeSchema);
