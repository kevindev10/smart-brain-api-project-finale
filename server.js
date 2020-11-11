const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const knex = require('knex');
const bcrypt = require('bcrypt');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = 	knex({
	  client: 'pg',
	  connection: {
	  	  connectionString: process.env.DATABASE_URL,
		  ssl: {
		    rejectUnauthorized: false
		  }
	  }
	});


app.use(bodyParser.json())
app.use(cors())


	

app.get('/',  (req, res) => {res.json('Its working !!!')})

app.post('/signin', (req,res) => { signin.handleSignin(req, res, bcrypt, db) })
app.post('/register',(req,res) => { register.handleRegister(req, res, bcrypt, db) })
app.get('/profile/:id', (req,res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req,res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req,res) => { image.handleApiCall(req, res) })

 const PORT = process.env.PORT || 3001 ;
app.listen(PORT , () =>{
	console.log(`App is running on port ${PORT}`)
})


/*
	/root --->  GET ----->it is working/or not
	/signin ----> POST ----> success/fail
	/register ----->POST ----> user
	/profile/:userId ----->GET ------> user
	/image ------>PUT -------> entries

*/