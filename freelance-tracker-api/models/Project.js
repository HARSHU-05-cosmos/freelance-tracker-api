const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    status: { type: String, enum: ['open', 'in-progress', 'completed'], default: 'open' },
    client: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    freelancer: { type: mongoose.Schema.ObjectId, ref: 'User' },
    deadline: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);