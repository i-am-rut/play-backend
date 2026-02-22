const userRequirements = {
    username: {
        min: 4,
        max: 20,
    },
    email: {
        lowercase: true,
    },
    fullName: {
        min: 2,
        max: 100,
    },
    avatar: {
        default: "",
    },
    coverImage: {
        default: "",
    },
    password: {
        min: 8,
        max: 32,
    },
    refreshToken: {}
}

export default userRequirements