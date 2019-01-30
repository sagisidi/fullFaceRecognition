HandleSignin = (req,res,db,bcrypt) => {
	const {email,password} = req.body;
	db.select('hash').from('login')
	.where({
		email:email
	})
	.then(pass => {

		const bool = bcrypt.compareSync(password,pass[0].hash);

		if(bool){
			return db.select('*').from('users')
			.where({
				email:email
			})
			.then(user => res.json(user[0]))
			.catch(err => res.status(404).json("Failed login"))			
			
		}
		else
			res.status(404).json("wrong credntials")
	})
	.catch(err => res.status(404).json("Failed"))
}

module.exports = {
	HandleSignin:HandleSignin
}