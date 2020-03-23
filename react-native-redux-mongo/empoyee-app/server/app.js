const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Employee');

app.use(bodyParser.json());
const Employee = mongoose.model('employees');
const mongoUri = "mongodb+srv://sun-23:23march2548@cluster0-0pxti.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',() => {
    console.log('connected to mongo 555')
})

mongoose.connection.on('error',(err) => {
    console.log('can not connect to mongo' ,err)
})

app.get('/', (req, res) =>{
    Employee.find({}).then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err =>{
        console.log('error',err)
    })
})

app.post('/send-data', (req, res) => {
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position,
    })

    employee.save().then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err =>{
        console.log('error',err)
    })
})

app.post('/delete',(req, res) => {
    console.log(req.body.id)
    Employee.findByIdAndRemove(req.body.id)
    .then(data =>{
        console.log('hello')
        res.send(data)
    }).catch(err =>{
        console.log('error',err)
    })
})

app.post('/update',(req, res) => {
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position,
    }).then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err =>{
        console.log('error',err)
    })
})

app.listen(4000, () => {
    console.log('server running on port 4000')
})

// {
//     "id":"5e70e90290a6023058cf2d12",
//     "name": "sam",
// "email": "112@11",
// "phone": "4255",
// "picture": "ughfih",
// "salary": "ihjfierjgt",
// "position": "pc builder"
// }