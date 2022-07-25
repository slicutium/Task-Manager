//async wrapper function to avoid setting up multiple
//try catch code blocks
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

//exporting the async wrapper function
module.exports = asyncWrapper