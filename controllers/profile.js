getProfile = (db) => (req,res)  =>{

	const {id}=req.params;
	db.select('*').from('users').where({id:id})
	.then(user=>{
		if(user.length){
			console.log(user[0]);
			res.json(user[0]);
		}
		else
			res.status(404).json('User Doesnt exist') ;

	})



}

module.exports = {
	getProfile:getProfile
}