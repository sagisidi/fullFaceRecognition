const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex')

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const PORT = process.env.PORT;
const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:true,
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

/*const db1 ={
	users:[
		{
			id:'1',
			name:'sagi',
			email:'sagisidi@gmail.com',
			password:'123456',
			entries:0,
			joined:new Date()
		},
		{
			id:'2',
			name:'vaknin',
			email:'vaknin@gmail.com',
			password:'1111',
			entries:0,
			joined:new Date()
		}
	],
	maxId:2,
	login:[
		{
			id:'987',
			hash:'',
			email:'sagisidi@gmail.com'
		}


	]
}
*/

app.get('/',(req,res) => {res.send("working");})
app.post('/Signin', (req,res) => {signin.HandleSignin(req,res,db,bcrypt)});
app.post('/Register',register.handleRegister(db,bcrypt));
app.get('/profile/:id',profile.getProfile(db));
app.put('/image',image.countEntries(db))
app.post('/imageUrl', (req,res) => {image.handleApiCall(req,res)});





app.listen(PORT || 3002, ()=>{
	console.log(`listen to port ${PORT}`)
})