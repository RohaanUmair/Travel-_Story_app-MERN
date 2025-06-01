import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdOn : { type: Date, default: Date.now }
});


const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;