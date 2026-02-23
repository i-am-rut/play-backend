import rateLimit from "express-rate-limit";

const createRateLimiter = ({
    windowMs = 15 * 60 * 1000,
    max = 5,
    message = "Too many requests. Please try again later.",
    skipSuccessfulRequests = false,
} = {}) => {
    return rateLimit({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        skipSuccessfulRequests,

        handler: (req, res) => {
            const resetTime = req.rateLimit?.resetTime
            const retryAfterSeconds = resetTime ? Math.max(1, Math.ceil((resetTime - Date.now()) / 1000)) : 60

            res.set("Retry-After", retryAfterSeconds)
            res.status(429).json({
                success: false,
                message,
                data: {
                    error: "RATE_LIMIT_EXCEEDED",
                    limit: req.rateLimit?.limit,
                    remaining: req.rateLimit?.remaining,
                    retryAfter: retryAfterSeconds,
                },
            })
        },
    })
}

export default createRateLimiter