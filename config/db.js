import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO)
    console.log("DB ONLINE");
  } catch (error) {
    console.log(error);
    console.log("Error iniciando db");
    process.exit(1);
  }

}
export default conectarDB