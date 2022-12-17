var exp = require('express')
var sql = require('mysql2')
var app = exp()

var con = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'test'
})

con.connect((err) => {
  if (!err)
    console.log("Connected..")
})

app.use(exp.static('resources'))

app.get('/emp', (req, res) => {
  res.sendFile(__dirname + '/emp.html')
})

app.get('/empAjax', (req, res) => {
  res.sendFile(__dirname + '/empAjax.html')
})

app.get('/empdata', (req, res) => {
  var empid = req.query.empid;
  // console.log(empid)
  con.query(`Select * from emp where empno=${empid}`, (err, data) => {
    // console.log(data)
    // res.send(data)
    if (!err) {
      // var str = "<div>"
      // str += `<p>empno: ${data[0].EMPNO}</p>`
      // str += `<p>empname: ${data[0].ENAME}</p>`
      // str += "</div>"
      // res.send(str);
      res.send(data)
    }
  })
})

app.listen(9000, console.log("Server Started..."))