const mongoose = require('mongoose')

function setupDB (dbUri) {
  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })

  const db = mongoose.connection

  db.on('error', (err) => {
    console.error('DB::error', err)
  })

  db.once('open', () => {
    console.log('DB::Connection Successful!')
  })

  return db
}

module.exports = setupDB
