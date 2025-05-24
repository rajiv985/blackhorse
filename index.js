import connectDB from "./src/db/mongoose.connect.js";
import app from "./app.js";
import 'dotenv/config' 
// for server connection   


const PORT = 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});  