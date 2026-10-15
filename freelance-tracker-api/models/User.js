const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['freelancer', 'client'], default: 'freelancer' },
    skills: [String],
    hourlyRate: { type: Number, default: 0 }
}, { timestamps: true });

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return ;
    this.password = await bcrypt.hash(this.password, 12);
    
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);