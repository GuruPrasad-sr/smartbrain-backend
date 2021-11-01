const express = require('express');
const bodyParser =require('body-parser');

const app = express();

app.use(bodyParser.json()); //must use this to parse json object into users type for email to be recognised.
const database ={

users:[
    {
        id:'123',
        name:'john',
        email:'john@gmail.com',
        password:'cookies',
        entries:0,
        joined:new Date()
    },
    {
        id:'124',
        name:'sally',
        email:'sally@gmail.com',
        password:'bananas',
        entries:0,
        joined:new Date()
    }
]
}

app.get('/',(req,res)=>{
    res.send(database.users);
})

app.post('/signin', (req , res)=>{
    if(req.body.email === database.users[0].email &&
         req.body.password === database.users[0].password){
        res.json('signin succesful');
        }
    res.status(400).json('sigin failed');
})

app.post('/register' , (req, res)=>{
    const {email , name ,password}=req.body;
    database.users.push({
        id:'125',
        name:name,
        email:email,
        password:password,
        entries:0,
        joined:new Date()
    })
    res.json(database.users[database.users.length-1]); //if i dont give this , postman will n=just hang in the sending page. Always give res.
})

app.get('/profile/:id',(req , res)=>{
    const { id } =req.params;
    let found =false;
    database.users.forEach(user =>{
        if(user.id===id){
            found=true;
           return res.json(user);
        } 
    })
    if(!found)
    {
        res.status(400).json('no such user');
    }

})

app.put('/image', (req,res)=>{
    const { id } =req.body;
    let found = false;
    database.users.forEach(user =>{
        if(user.id===id){
            found=true;
            user.entries++;
            return res.json(user.entries);
        } 
    })
    if(!found)
    {
        res.status(400).json('no such user');
    }
})

app.listen (3000 , ()=>{
    console.log('app is runnig on port 3000');
})





















/*
/--- res = this is working

/signin -- post = success/fail //we are doing a post bcoz we want to hide the password by sendingit in the body of the request.
/register -- post = user
/profile/:userid --get = user
/image -- put = user

*/