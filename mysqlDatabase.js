var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'company_database'
});

connection.connect((err)=>{
    if(err){
        console.log('Unable to connect with mysql')
        return
    }
    console.log("Connected with mysql")
})
connection.query('select * from employee', (err, result) =>{
  if(err) throw err
  console.log(result)
})