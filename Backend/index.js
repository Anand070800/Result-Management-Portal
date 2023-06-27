const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 4300

app.use(cors());
app.use(bodyparser.json());

//listen on port
app.listen(port,()=>console.log(`Listening on port ${port}`))

//database connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'resultmanagementdb',
    port: 3306,
});

//check connection of database
pool.getConnection((err, connection)=> {
    if(err){
        console.log('Error connecting to bd', err);
    } else {
        console.log('Databases connected..');
        connection.release();
    }
});

//Teacher-Login
app.post('/teacher-login', async (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        let selectQuery = 'SELECT * FROM teacher WHERE uname=? AND pass=?';
        let query = mysql.format(selectQuery, [req.body.name, req.body.pass]);
         pool.query(query, (err, data) => {
            if (err) {
                connection.release();
                console.error(err);
                return;
            }
            if (data.length > 0) {
                connection.release();
                return res.status(200).json({ message: "valid" });
            }
            else {
                return res.status(200).json({ message: "invalid" });
                connection.release();
            }
        });
    });
})

//Add Record of a Student
app.post('/add-record', async (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        let selectQuery = 'SELECT * FROM record WHERE rollno=?'
        let query = mysql.format(selectQuery, [req.body.rollno]);
        pool.query(query, (err, data) => {
            if (err) {
                connection.release();
                console.error(err);
                return;
            }
            // rows fetch
            console.log(data);
            if (data.length > 0) {
                connection.release();
                return res.status(200).json({ message: "Already exist" });
            }

            else {
                let insertQuery = 'INSERT INTO record (rollno,name,dob,score) VALUES (?,?,?,?)';
                let Query = mysql.format(insertQuery, [req.body.rollno, req.body.name, req.body.dob, req.body.score]);
                pool.query(Query, (err, data) => {
                    if (err) {
                        connection.release();
                        console.error(err);
                        return;
                    }
                    connection.release();
                    return res.status(200).json({ message: "Added Successfully" });

                })
            }
        })
    })
})


//Edit 
app.post('/edit', async (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
    let updateQuery = "UPDATE record SET name = ? , dob=? ,score=? WHERE rollno = ?";
    let query = mysql.format(updateQuery, [req.body.name, req.body.dob, req.body.score, req.body.rollno]);
    // query = UPDATE 
    pool.query(query, (err, response) => {
        if (err) {
            connection.release();
            console.error(err);
            return;
        }
        // rows updated
        console.log(response.affectedRows);
    });
    connection.release();
    return res.status(200).json({ message: "valid" });
    })
})

//Teacher- view or All listed Data

app.get('/teacher-view', async (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        let selectQuery = 'SELECT * FROM record';
        pool.query(selectQuery, (err, data) => {
            if (err) {
                connection.release();
                console.error(err);
                return;
            }
            // rows fetch
            console.log(data);
            connection.release();
            return res.status(200).json({ message: "valid", data: data });
        });
    });

})

//Delete A Record
app.get('/delete/:rollno', async (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        let selectQuery = 'DELETE FROM record WHERE rollno=?';
        let query = mysql.format(selectQuery, [req.params.rollno]);
        pool.query(query, (err, data) => {
            if (err) {
                connection.release();
                console.error(err);
                return;
            }
            // rows fetch
            console.log(data);
            connection.release();
            return res.status(200).json({ message: "valid" });
        });
    });
})


//Student-Login
app.post('/student-login', async (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        let selectQuery = 'SELECT * FROM record WHERE dob=? AND rollno=?';
        let query = mysql.format(selectQuery, [req.body.dob, req.body.rollno]);
        pool.query(query, (err, data) => {
            if (err) {
                connection.release();
                console.error(err);
                return;
            }
            if (data.length > 0) {
                connection.release();
                return res.status(200).json({ message: "valid" });
            }
            else {
                connection.release();
                return res.status(200).json({ message: "invalid" });
            }
        });
    });
})

//View Result
app.get('/viewresult/:rollno', async (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        let selectQuery = 'SELECT * FROM record Where rollno=?';
        let query = mysql.format(selectQuery, [req.params.rollno]);
        pool.query(query, (err, data) => {
            if (err) {
                connection.release();
                console.error(err);
                return;
            }
                connection.release();
                return res.status(200).json({data: data });     
        });
    });

})