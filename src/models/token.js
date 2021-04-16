import { Schema, model } from 'mongoose'

const tokenSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 300
    }
})
const Token = model('tokens', tokenSchema)
export default Token