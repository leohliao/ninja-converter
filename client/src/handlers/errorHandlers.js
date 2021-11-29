export const errorHandler = (fn) => {
    return fn.catch((err) => {
        let defaultErrorMsg = 'Error occurred during API calls'
        if (err.message) {
            defaultErrorMsg = err.message
        }
        return {
            data: {
                status: 'error',
                msg: defaultErrorMsg
            }
        };
    })
}