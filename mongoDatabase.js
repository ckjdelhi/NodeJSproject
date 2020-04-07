const express = require('express');
const app = express();
var bodyParser =  require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CONNECTION_URL = "mongodb+srv://admin:admin@cluster0-by2lt.mongodb.net/Company?retryWrites=true&w=majority";
var database

app.get('/', (request,response) => {
    database.collection("Employees").find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
})
app.post('/addEmployee', (request,response) => {
    database.collection("Employees").insertMany(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
})
app.get('/employee/:rollno', (request,response) => {
    let id = request.params.rollno;
    database.collection("Employees").find({'rollno': parseInt(id)}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
})



app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db("Company");
        console.log("Connected to `" + 'Company' + "`!");
    });
});