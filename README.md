# E-Learning-backend Cloned
The new implentation added the this code giving role access to instructors and students.
uploading of image
Adding welcome mail and OTP comfirmation mail.
Forgot password mail and and receving password reset link through mail.
Agreegation to sort and filter data

documentation link
https://documenter.getpostman.com/view/33726253/2sAYXEEdwJ
 







# E-Learning-backend
This is the documentation for E-learning Platform endpoint.

﻿

Auth operations
This folder contains the Authentication and authorization APIs

﻿

Register User
This endpoint allows the registration of a new user.

Request Body
name (string) : The name of the user.
email (string) : The email address of the user.
password (string) : The password for the user account.
bio (string) : A brief biography or description of the user.
profilePicture (string) : URL of the user's profile picture.
role (string) : The role of the user (e.g., student, instructor).

Response
Upon successful registration, the server responds with a status code of 201 and a JSON object containing:

success (boolean) : Indicates if the registration was successful.
user (object) : An object containing the newly registered user's details, including id, name, email, and role.
﻿


Login API
This API endpoint is used to authenticate and login a user.

Request Body
email (string) - The email address of the user.
password (string) - The password of the user.

Response
The response will include the authentication token for the user upon successful login.

﻿

Course API's endpoint
This folder contains the course API's endpoint

﻿

GET
Get all course
GET all course details
This endpoint retrieves a list of courses along with their details.

Request Body
This request does not require a request body.

API endpoint
﻿http://localhost:5000/api/v1/﻿

Access
This API can be accessed by all users


Create Course
This endpoint allows you to create a new course.

Request URL
post http://localhost:5000/api/v1/create﻿

Access
Only Instructor has access to create a course.

Request Body
title (string): The title of the course.
description (string): A brief description of the course.
category (string): The category of the course.
instructor (string): The ID of the instructor.
price (number): The price of the course.
level (string): The difficulty level of the course.
lessons (array): An array of lesson objects containing title, content, videoUrl, duration, and resources.
title (string): The title of the lesson.
content (string): The content of the lesson.
videoUrl (string): The URL of the lesson video.
duration (number): The duration of the lesson.
resources (array): An array of URLs for additional resources.
quizzes (array): An array of quiz objects containing question, options, and correctAnswer.
question (string): The quiz question.
options (array): An array of options for the quiz question.
correctAnswer (number): The index of the correct answer in the options array.
studentsEnrolled (array): An array of student IDs enrolled in the course.

Response
The response will contain a success status and the details of the created course.

success (boolean): Indicates if the course creation was successful.
createCourse (object): Details of the created course including title, description, category, instructor, price, level, lessons, quizzes, studentsEnrolled, and metadata.
﻿


Delete Course
This endpoint sends an HTTP DELETE request to delete a specific course.

Request Body
This request does not require a request body.

Request URL
post http://localhost:5000/api/v1/delete/courseId﻿
Access
Only Instructor has access to delete a course.

﻿


Update Course Details
This endpoint allows updating the details of a specific course.

Request URL
post http://localhost:5000/api/v1/delete/courseId﻿

Access
Only Instructor has access to update a course.

Request Body
title (string): Title of the course.
description (string): Description of the course.
category (string): Category of the course.
instructor (string): ID of the instructor.
price (number): Price of the course.
level (string): Level of the course.
lessons (array): Array of lesson objects with the following properties:
title (string): Title of the lesson.
content (string): Content of the lesson.
videoUrl (string): URL of the lesson video.
duration (number): Duration of the lesson.
resources (array): Array of URLs for additional resources related to the lesson.
quizzes (array): Array of quiz objects with the following properties:
question (string): Quiz question.
options (array): Array of options for the quiz.
correctAnswer (number): Index of the correct answer in the options array.
studentsEnrolled (array): Array of enrolled student IDs.

Response
success (boolean): Indicates if the update was successful.
updateCourse (object): Updated course details with the same structure as the request body, but with updated values.


this is the link to the postman documentation: 
https://documenter.getpostman.com/view/33726253/2sAYXEEdwJ
