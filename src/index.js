import dotenv from 'dotenv'
// require('dotenv').config({path : './env'})
import connectDB from "./db/index.js"
import { app } from './app.js'


dotenv.config({
    path : "./env"
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server listening on Port ${process.env.PORT}`);
    })

    app.on("error" , (err) => {
        console.log("Error : ", err)
        throw err
    })
})
.catch((err) => console.log("MONGODB connection failed. !!!", err))







/*

// iffies
(async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log("ERROR: ", error)
        throw error
    }
})()

*/