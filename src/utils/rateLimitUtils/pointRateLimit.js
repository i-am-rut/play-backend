import createRateLimiter from "../rateLimitUtils/createRateLimit.js"

export const firePointRateLimit = createRateLimiter({
    max: 100,
    message: "Too many points fired!"
})

export const editPointRateLimit = createRateLimiter({
    max: 10,
    message: "Too many edit requests!"
})