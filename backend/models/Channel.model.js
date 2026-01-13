import mongoose from "mongoose";

const channelSchema = mongoose.Schema({
    fk_id_workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model('Channel', channelSchema)