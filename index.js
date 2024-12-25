import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import db from "./models/db.js"
import userRoute from "./routes/user.route.js"
import appointmentRoute from "./routes/appointment.route.js"
import cors from "cors"
dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use("/user", userRoute);
app.use("/", appointmentRoute)

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log("server started on " + port)
});