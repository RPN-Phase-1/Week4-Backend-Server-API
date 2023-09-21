import express from 'express'
import { router } from './routes/index.js'

const app = express()

app.get('/', (req, res) => {
    res.send("Hello Prisma!")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

export { app }