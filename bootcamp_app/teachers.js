const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests on teachers.id = assistance_requests.teacher_id
JOIN students on students.id = assistance_requests.student_id
JOIN cohorts on students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1 || 'JUL02'
ORDER BY teacher;
;`, [process.argv[2]])
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    })
  });