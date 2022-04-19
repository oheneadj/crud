// Import Express
const express = require('express');
const { dbConnect } = require('./config/dbConnect')

// Import Routers
const indexRouter = require('./routes/blogRoutes');
// const authRouter = require('./routes/auth.router');

const app = express();
app.use(express.json());

// //Middleware
// app.use((req, res, next) => {
//     console.log('Global Middleware');
//     next();
// })

//Use Routers
app.use("/", indexRouter);
// app.use("/auth", authRouter);





//Check if database is connected and run server
const startUp = async () => {
    // Set PORT number
    const port = 4000;

    //Check if the database is connected
    await dbConnect();

    // Listen to port for server
    app.listen(port, ()=> console.log(`🚀 Server Running on PORT:${port} `));   
}

startUp();
