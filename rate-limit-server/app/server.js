import express from 'express'
import Redis from 'ioredis'

import { rateLimit } from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'

const redis = new Redis({ host: 'redis' })

const app = express()
const port = 3000

const limiter = rateLimit({
    windowMs: 1000,
    limit: 4,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    store: new RedisStore({ sendCommand: (...args) => redis.call(...args) }),
})

app.use(limiter)

app.get('/', (req, res) => {
    console.info('req received')
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
