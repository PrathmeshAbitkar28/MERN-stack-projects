const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        const uri = 'mongodb://localhost:27017/MERNtodoapp';
        await mongoose.connect(uri);

        console.log('✅ MongoDB connected');
    console.log('  host:', mongoose.connection.host);
    console.log('  port:', mongoose.connection.port);
    console.log('  db name:', mongoose.connection.name);
    console.log('  collections:', Object.keys(mongoose.connection.collections));

    console.log(`✅ mongodb connected : ${mongoose.connection.host}`)
    }
    catch(err)
    {
        console.error(`❌ mongodb connection error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB; 