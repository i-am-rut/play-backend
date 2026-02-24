import createRateLimiter from "./createRateLimit.js";


export const registerLimiter = createRateLimiter({
    max: 5,
    message: "Too many registration attempts. Please try again later.",
})

export const signInLimiter = createRateLimiter({
    max: 5,
    message: "Too many login attempts. Please try again later.",
    skipSuccessfulRequests: true,
})

export const changePasswordLimiter = createRateLimiter({
    max: 3,
    message: "Too many password change attempts",
})

export const refreshAccessTokenLimiter = createRateLimiter({
    max: 20,
    message: "Too many refresh token requests"
})

export const getCurrentUserLimiter = createRateLimiter({
    max: 900,
})

export const logoutLimiter = createRateLimiter({
    max: 30
})

export const updateUserDetailsLimiter = createRateLimiter({
    max: 10,
    message: "Too many account updation requests"
})