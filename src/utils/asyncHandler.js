

// In promises
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve((req,res,next)).catch((err) => next(err))
    }
} 



// In try / Catch Block
// const asyncHandler = (fn) => async (req, res, next) => {
//       try {
//         await fn(req, res, next)
//       } catch(err) {
//         res.status(err.code || 500).json({
//             success: false,
//             message : err.message
//         })
//       }
// }




export {asyncHandler}