// require('dotenv').config();
require('dotenv').config({ quiet: true });
// start the server 
const app = require('./src/app');
const connectDB = require('./src/db/db')
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});