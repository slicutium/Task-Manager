//notFound middleware
const notFound = (req, res) => res.status(404).send('Route does not exists')

//exports notFound function middleware
module.exports = notFound