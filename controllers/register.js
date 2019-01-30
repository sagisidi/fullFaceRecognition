handleRegister = (db,bcrypt) => (req,res) =>{
	const {name,email,password} = req.body;
	const hash = bcrypt.hashSync(password);

	db.transaction(trx => {
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				name:name,
				email:loginEmail[0],
				entries:0,
				time:new Date()
			
			})	
			.then(user => {
					res.json(user[0]);
			})

		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(404).json('Unable to Register') );
}

module.exports ={
	handleRegister:handleRegister

};