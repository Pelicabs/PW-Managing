const client = new MongoClient(process.env.MONGO_URI)

const Users = client.db('authentication').collection('users')
module.exports = {Users}