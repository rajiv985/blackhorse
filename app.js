import express from "express"
import cors from 'cors'
import 'dotenv/config'  
import router from "./src/routes/auth.routes.js";   
//import taskrouter from "./src/routes/task.routes.js"

const app = express();  
app.use(cors(
    {
        origin: "http://localhost:3000",
        methods:['GET', 'POST','PUT','DELETE'],
        credentials: true
    }
))
app.use(express.json());    

app.use("/auth",router) 
//app.use("/task",taskrouter)


 export default app;    
