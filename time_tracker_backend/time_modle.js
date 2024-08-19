import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true
    },
    isEnd:{
        type:Boolean,
    },
    endTime: { type: Date },
    duration: { type: Number },
});

const Time = mongoose.model("Time", timeSchema);
export {Time};