const handleSignin = (req, res, bcrypt, db) => {
	const {email,password} = req.body
	if( !email || !password){
     	return res.status(400).json('Unable to signin1')
     }

	db.select('*').from('login')
	.where ("email" , "=" ,email)
	.then(user =>{
		
		let userPassword = bcrypt.compareSync(password, user[0].hash);
		
		if(userPassword === true){
			return db.select('*').from('users')
				.where ("email" , "=" ,email)
				.then(userData =>{
					 res.json(userData[0])
				})

		}else{
			res.status(400).json('Unable to signin2')
		}
	})
	.catch(err => res.status(400).json('Signin procees failed') )

  		 
}

module.exports = {
 handleSignin:handleSignin
}