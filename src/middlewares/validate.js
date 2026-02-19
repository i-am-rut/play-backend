const validate = (schema) => {
    return (async function (req, res, next) {
        try {
            const validatedData = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            })

            req.body = validatedData.body,
            req.query = validatedData.query,
            req.params = validatedData.params

            next()

        } catch (error) {
            return next(error)
        }
    })
}

export default validate