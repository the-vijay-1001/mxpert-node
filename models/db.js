import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/mxpert-test-node").then(() => {
    console.log("mongodb connected")
}).catch((err) => {
    console.log(err)
})

export default mongoose.connection;