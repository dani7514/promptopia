import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {

    try {
        await connectToDB();
        const prompts = await Prompt.findById(params.id).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}

export const  PATCH = async (request, {params}) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();
        const existingPrompts = await Prompt.findById(params.id).populate('creator')

        existingPrompts.prompt= prompt;
        existingPrompts.tag=tag;

        await existingPrompts.save()

        return new Response(JSON.stringify(existingPrompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}

export const DELETE = async (request, {params}) => {

    try {
        await connectToDB();
        
        await Prompt.findByIdAndRemove(params.id).populate('creator')

       
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}