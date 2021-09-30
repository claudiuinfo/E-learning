The project was an e-learning platform divided into 2 modules: STUDENT and TEACHER.
The technologies used in the project were: React for frontend, Spring for backend and MySQL for database.

In the TEACHER module, he can create new quizzes with a variable number of questions and answers by selecting a deadline and a timer.
Quizzes can be filtred by visibility: VISIBLE that the student can see and NOT VISIBLE that the student cannot see and the teacher saves them as a draft.
In a quiz saved as a draft, questions and answers can be added, deleted or edited. When the teacher decides to make the quiz VISIBLE, all students will receive an email notifying them of this.
Also, the quizzes can be ACTIVE, meaning that the deadline has not been reached and FINISHED, meaning that the deadline has been reached and the teacher can enter and download an excellent grade for the students.
Also, a CRON JOB runs at pre-set intervals which, when passing a quiz from ACTIVE to FINISHED, sends an email to the teacher notifying him that he can download the results.

In the STUDENT module, he can filter quizzes by teacher or status.
The statuses are ACTIVE and the student can still access them by the deadline, COMPLETED meaning that the student has completed the quiz and received a grade and EXPIRED are the quizzes that have reached the deadline without being accessed by the student.
An ACTIVE quiz starts by pressing the start button and then a TIMER will start.
In the quiz the student can answer questions with one or more answer options. If the time has expired then the current situation of the quiz is saved and corrected on the spot.
If the quiz is completed ahead of time then the submit button is pressed and the student will receive the grade on the spot.

Both STUDENTS and TEACHERS have a common UPLOAD space where you can see who, when and what uploaded.
You can upload any type of files, from txt and pdf files to jpg and mp4. Pressing the upload button will load the progress bar and then update it in the table.
