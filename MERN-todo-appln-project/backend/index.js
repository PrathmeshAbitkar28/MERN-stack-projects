const express = require('express');
const cors = require('cors');
// connect db
const connectDB = require('./config/db');

const app = express();

connectDB();

// middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/todo', require('./routes/taskroutes'));

//start server
const PORT = process.env.PORT || 5000;

// Add this before app.listen()
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Something went wrong!' });
});

app.listen(PORT, ()=>{
    console.log(`server started on  port ${PORT}`);
});
 