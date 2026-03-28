// create the server

const express = require('express')
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes')
const cors = require('cors');
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const path = require('path');
// app.use('/public', express.static(path.join(__dirname, '..', 'public')));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));



app.get('/',(req,res)=>{ 
    res.send('Hello World');
})

app.use("/api/auth",authRoutes);
app.use("/api/food",foodRoutes);

// const viewRoutes = require("./routes/view.routes");
// app.use("/", viewRoutes);
// app.use("/api/auth", authRoutes);



module.exports = app;
