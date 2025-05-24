
import mongoose from 'mongoose';
import 'dotenv/config'  

const mongodbURL = process.env.MONGODB_URL;
const mongodbName = process.env.MONGODB_NAME;

// Connect to MongoDB
const connectDB = async () => {
    console.log("Connecting to DB:", mongodbURL);
    try {
        await mongoose.connect(`${mongodbURL}/${mongodbName}`);
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Error connecting to DB:", err.message);
    }
}; 
 export default connectDB;

// Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// }); 
// export default connectDB ;
