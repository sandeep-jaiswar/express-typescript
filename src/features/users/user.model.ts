import * as mongoose from 'mongoose';
import User from './user.interface';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
