import mongoose from "mongoose";

const MembersWorkspace = mongoose.model('MembersWorkspace', new mongoose.Schema({
    fk_id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fk_id_workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['owner', 'admin', 'user'],
        default: 'user',
        required: true
    }
}))

export default mongoose.model('MembersWorkspace', MembersWorkspace)