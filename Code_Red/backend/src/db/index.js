import mongoose from "mongoose"

const connectDB = async()=>{

     try {
         
        const conenctionInstance= await 
        
        mongoose.connect(`${process.env.MONGODB_URI}/urbanclap`);

        console.log(`\n MONGODB connected successfully DB_HOST:${conenctionInstance.connection.host}`);

        
     } catch (error) {
        console.error("MONGODB connection failed ",error.message);
        process.exit(1);
     }
}

export default connectDB