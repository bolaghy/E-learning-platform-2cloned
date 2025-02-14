const router = require('express').Router()
const authMiddleware = require('../Middleware/authMiddleware')
const roleMiddleware = require('../Middleware/roleMiddleware')
const {getAllCourses, createCourse, getSingleCourse, updateACourse, deleteACourse} = require('../Controllers/course')


router.route(`/`).get(getAllCourses).post(authMiddleware, roleMiddleware(["instructor"]), createCourse)
router.route(`/:Id`).get(getSingleCourse).delete(authMiddleware, roleMiddleware(["instructor"]), deleteACourse).put(authMiddleware, roleMiddleware(["instructor"]),updateACourse)

// // Routes that use middleware
// router.route('/profile').get(authMiddleware, (req, res) => {
//     res.json({ message: "This is a protected route" });    
//   });
   
module.exports = router   