const Clarifai = require ('clarifai') ;
const app = new Clarifai.App({
 apiKey: '87b5eb01a1b44f60aa27702bed42544d'
});

const handleApiCall = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err =>res.status(400).json('Api call failure'))
	
}


 const handleImage =(req, res, db) => {
		const {id} = req.body

		db('users')
		  .where('id', '=', id)
		  .increment('entries', 1)
		  .returning('*')
		  .then(user => {
		  	
		  	 res.json(user[0].entries)
		  })
		  .catch(err =>res.status(400).json('Not found'))

}

module.exports ={
	handleImage:handleImage,
	handleApiCall:handleApiCall
}