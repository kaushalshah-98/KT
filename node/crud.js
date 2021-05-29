/* CRUD Operation */

let { connection, app, mysql } = require('./connection');

app.get('/ping', function (req, res) {
  res.send('Pong');
});
app.get('/display-data', (req, res) => {
  let sql = 'SELECT * FROM student';
  connection.query(sql, (err, row, field) => {
    if (err) console.log('Error Obtaining a result..');
    else res.send(row);
  });
});
app.get('/display-data/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * FROM student WHERE id=' + mysql.escape(id);
  connection.query(sql, (err, row, field) => {
    if (err) console.log('Error Obtaining a result..');
    else res.send(row);
  });
});
app.post('/submit-data', (req, res) => {
  let sql = 'INSERT INTO student (id, name, age, city) VALUES ?';
  let values = [[req.body.id, req.body.name, req.body.age, req.body.city]];
  connection.query(sql, [values], (err, row, field) => {
    if (err) console.log('Error Obtaining a result..');
    else res.send('row Updated: ' + row.affectedRows);
  });
});

app.put('/update-data/:id', (req, res) => {
  let id = req.params.id;
  let s = 'select * from student WHERE id =' + mysql.escape(id);
  connection.query(s, (err, row, field) => {
    let updateQueryPart = '';
    let keys = Object.keys(req.body);
    for (i = 0; i < keys.length; i++) {
      updateQueryPart += `${keys[i]}=${mysql.escape(req.body[keys[i]])}`;
      updateQueryPart += `${i < keys.length - 1 ? ',' : ''}`;
    }
    let sql = 'UPDATE student SET ' + updateQueryPart + ' WHERE id =' + mysql.escape(id);
    connection.query(sql, (err, row, field) => {
      if (err) console.log('Error Obtaining a result..');
      else res.send(row);
    });
  });
});
app.delete('/delete-data/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'DELETE FROM student WHERE id=' + mysql.escape(id);
  console.log(sql);
  connection.query(sql, (err, row, field) => {
    if (err) console.log('Error Obtaining a result..');
    else res.send('row Deleted: ' + row.affectedRows);
  });
});

app.listen(5000, () => console.log('Running at localhost:5000.....'));
