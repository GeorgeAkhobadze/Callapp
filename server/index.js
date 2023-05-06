import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import userRoutes from './routes/user.js'

const app = express()

app.use('*', cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(5000, function () {
    console.log(`Listening on port ${PORT} ❤️`)
})
