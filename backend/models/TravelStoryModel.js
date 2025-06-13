import mongoose, { Schema } from "mongoose";


const TravelStorySchema = mongoose.Schema({
    title: { type: String, required: true },
    story: { type: String, required: true },
    visitedLocation: { type: [String], default: [] },
    isFavorite: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdOn: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    visitedDate: { type: String, required: true }
});


const TravelStory = mongoose.models.TravelStory || mongoose.model('TravelStory', TravelStorySchema);

export default TravelStory;