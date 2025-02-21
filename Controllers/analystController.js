const Course = require('../Models/course');

// Aggregate pipeline to count total courses
const countTotalCourses = async (req, res) => {
    
  try {
    const totalCourses = await Course.countDocuments({});
    res.status(200).json({ success: true, totalCourses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

// Aggregate pipeline to count courses by instructor
const countInstructorCourses = async (req, res) => {
    console.log('Request received for countInstructorCourses');
  try {
    const result = await Course.aggregate([
      {
        $group: {
          _id: '$instructor',
          totalCourses: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'instructorDetails',
        },
      },
      {
        $unwind: '$instructorDetails',
      },
      {
        $project: {
          _id: 0,
          instructorId: '$_id',
          instructorName: '$instructorDetails.name',
          instructorEmail: '$instructorDetails.email',
          totalCourses: 1,
        },
      },
    ]);
    console.log('Aggregation result:', result);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log('Aggregation result:', error);;
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { countTotalCourses, countInstructorCourses };