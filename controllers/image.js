const Clarifai = require('clarifai');


  const app = new Clarifai.App({
   apiKey: 'fa20fa9c06214d298d7cff49b25767b1'
  });

const handleApiCall = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {res.json(data)})
	.catch(err => {res.status(400).json('Unable to work with api')})

}  

countEntries = (db) => (req,res) =>{
	const {id}=req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries',1 )
	.returning('entries')
	.then(resp=>{
			res.json(resp[0])

	})
	.catch(err => res.status(404).json("Failed"))

}

module.exports = {
	countEntries:countEntries,
	handleApiCall:handleApiCall
}