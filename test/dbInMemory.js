const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongoServer = new MongoMemoryServer()

// Provide connection to a new in-memory database server.
async function connect () {
  // Prevent MongooseError: Can't call `openUri()` on
  // an active connection with different connection strings
  await mongoose.disconnect()

  const mongoUri = await mongoServer.getUri()
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }, err => {
    if (err) {
      console.error(err)
    }
  })
}

// Remove and close the database and server.
async function close () {
  await mongoose.disconnect()
  await mongoServer.stop()
}

// Remove all data from collections.
async function clear () {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}

module.exports = {
  connect,
  close,
  clear
}
