import createRateLimiter from "./createRateLimit.js"

const globalLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Too many API requests.",
})

export default globalLimiter