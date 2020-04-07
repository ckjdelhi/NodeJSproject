const express = require('express');
const mysql      = require('mysql');
const app = express();
var bodyParser =  require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'company_database'
  });
  
conn.connect((err)=>{
        if(err){
            console.log('Unable to connect with mysql')
            return
        }
        console.log("Connected with mysql")
    })
let data = []

app.get('/', (req,resp) => {
    conn.query('select * from employee', (err, result) =>{
        if(err) throw err
        result.forEach(obj =>{
            let resultData ={}
            resultData.id = obj.Id
            resultData.name = obj.Name
            resultData.address = obj.Address
            resultData.country = obj.Country
            resultData.phone = obj.Phone
            resultData.updateDate = obj.Updated_on
            data.push(resultData)
        })
        resp.send(data)
      })
})
app.get('/users', (req,resp) => {
    resp.send(data)
})
app.get('/users/:id', (req,resp) => {
    let id = req.params.id;
    let searchingData;
    data.forEach(userData =>{
        if(userData.id == id){
            searchingData = userData
        }
    })
    resp.send(searchingData)
})
app.post('/users/addUser', (req,resp) => {
    let param1 = req.body
    conn.query('INSERT INTO employee SET ?', param1, (err,res)=>{
        if(err) throw err
        console.log(res)
    })
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});