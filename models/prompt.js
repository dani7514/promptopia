import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: "string",
        required: [true,'Prompt is required'],
        
    },
    tag : {
        type: "string",
        required: [true,'Tag is required'],
    }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;