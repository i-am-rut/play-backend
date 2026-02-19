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
    password: {},
    refreshToken: {}
}

export default userRequirements