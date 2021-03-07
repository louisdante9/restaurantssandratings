import dotenv from 'dotenv'
dotenv.config()

module.exports = {
  dbUrl: process.env.DB_URL
}
