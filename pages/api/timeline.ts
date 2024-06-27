import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { format } from 'date-fns';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API handler invoked");  // Log to ensure the handler is invoked
    console.log("Request body:", req.body);  // Log the request body to ensure data is received correctly

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
        return;
    }

    const { projectName, projectDescription, deadline } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;
    const today = format(new Date(), 'yyyy-MM-dd'); // Get today's date in the same format as the deadline

    if (!apiKey) {
        res.status(500).json({ error: 'OpenAI API key is not set. Please check your environment variables.' });
        return;
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `
Today's date is ${today}. Please create a detailed Agile/Scrum timeline for the project '${projectName}' involving '${projectDescription}', that should be completed by ${deadline}. 
Include key Agile/Scrum phases such as requirements gathering, sprint planning, development, testing, review, and deployment. 
Organize these phases to start from today and ensure all activities are planned realistically to meet the deadline of ${deadline}.
`;

    try {
        console.log("Making OpenAI API call with model: gpt-4o");  // Log before the API call

        const response = await openai.chat.completions.create({
            model: "gpt-4o",  // Ensure this is the updated model name
            messages: [
                { role: "system", content: "You are a helpful assistant specializing in Agile/Scrum project management." },
                { role: "user", content: prompt }
            ]
        });

        if (response.choices.length > 0 && response.choices[0].message?.content) {
            console.log("Model used:", response.model); // Log the model name to verify
            res.status(200).json({ result: response.choices[0].message.content });
        } else {
            res.status(404).json({ error: 'Failed to generate timeline.' });
        }
    } catch (error: unknown) {
        res.status(500).json({ error: 'An unknown error occurred.' });
        console.error('Error:', error);
    }
}
