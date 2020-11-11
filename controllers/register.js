const handleRegister = (req, res, bcrypt, db) => {
	 const {name,email,password} = req.body;
	 const saltRounds = 10;
	 const salt = bcrypt.genSaltSync(saltRounds);
     const hash = bcrypt.hashSync(password, salt);

     if(!name || !email || !password){
     	return res.status(400).json('Unable to register')
     }
     db.transaction(trx =>{ 
     	trx('login').insert({
     		email:email,
     		hash: hash
     	})
     	.returning('email')
     	.then(loginEmail =>{
     		return trx('users').insert({
				 	name: name,
				 	email:loginEmail[0],
				 	joined:new Date()
				 })
				 .returning('*')
				 
				 .then(user => res.json(user[0]))
				 .catch(err => res.status(400).json('Unable to register1'))
			     	})

     	.then(trx.commit)
    	.catch(trx.rollback);

    })
    	 
	.catch(err => res.status(400).json('Unable to register2'))
	
}

module.exports ={
    handleRegister:handleRegister
}