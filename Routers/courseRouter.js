const router = require('express').Router()
const {roleMiddleware, authMiddleware} = require('../Middleware/authMiddleware')
const {getAllCourses, createCourse, getSingleCourse, updateACourse, deleteACourse} = require('../Controllers/course')


router.route(`/`).get(getAllCourses)
router.route(`/:Id`).get(getSingleCourse)
router.post('/create', authMiddleware, roleMiddleware(["instructor"]), createCourse)
router.delete('/delete/:Id', authMiddleware, roleMiddleware(["instructor"]), deleteACourse)
router.put('/update/:Id',authMiddleware, roleMiddleware(["instructor"]),updateACourse)


      
  
   
module.exports = router   