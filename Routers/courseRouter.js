const router = require('express').Router()
const {roleMiddleware, authMiddleware} = require('../Middleware/authMiddleware')
const {getAllCourses, createCourse, getSingleCourse, updateACourse, deleteACourse,} = require('../Controllers/course')
const {countTotalCourses, countInstructorCourses} = require('../Controllers/analystController')

router.route(`/`).get(authMiddleware, getAllCourses)
router.route(`/:Id`).get(authMiddleware, getSingleCourse)
router.post('/create', authMiddleware, roleMiddleware(["instructor"]), createCourse)
router.delete('/delete/:Id', authMiddleware, roleMiddleware(["instructor"]), deleteACourse)
router.put('/update/:Id',authMiddleware, roleMiddleware(["instructor"]),updateACourse)

router.get('/count-all-courses', countTotalCourses);
router.get('/count-all-instructor-courses', countInstructorCourses);   

   
module.exports = router   