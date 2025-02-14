const mongoose = require('mongoose')
const Schema = mongoose.Schema


const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Programming', 'Design', 'Marketing', 'Business', 'Other'],
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model (Instructor)
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    lessons: [{
        title: String,
        content: String,
        videoUrl: String,
        duration: Number, // Duration in minutes
        resources: [String] // Additional resources like PDFs, links
    }],
    quizzes: [{
        question: String,
        options: [String],
        correctAnswer: Number // Index of the correct option
    }],
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to User model (Students)
    }],
},{timestamps: true})
module.exports = mongoose.model('Course', courseSchema)