import { app } from "./app.js";
import dbConnect from "./db/dbConnect.js";


dbConnect()
    .then(() => {
        app.on("error", (err) => {
            console.log("Some error found in express server: ", err)
        })
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is listening on port: ${process.env.PORT}`)
        })
    }).catch((err) => {
        console.log("Error occoured in listening to requests", err)
    })