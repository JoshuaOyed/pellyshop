import mongoose from "mongoose";

const connectDB = async () => {
    if (process.env.MONGO_URI !== undefined) {
        try {
            const connect = await mongoose.connect(process.env.MONGO_URI);
            console.log(`MOngoDb connected successfully to ${connect.connection.host}`)

        } catch (error: any) {
            console.error(`Error: ${error.message}`)
            process.exit(1)
        }
    }
}

export default  connectDB