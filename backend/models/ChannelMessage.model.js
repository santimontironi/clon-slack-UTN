import mongoose from "mongoose";

const channelMessageSchema = mongoose.Schema({
    fk_id_channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    },
    fk_id_member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MembersWorkspace',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('ChannelMessage', channelMessageSchema)