import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

import dotenv from 'dotenv'
dotenv.config();


// create a ratelimiter that allows 5 requests per minute
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '20 s'),
  analytics: true
})

export default rateLimit;