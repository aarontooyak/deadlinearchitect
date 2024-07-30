import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { format } from 'date-fns';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API handler invoked");
    console.log("Request body:", req.body);

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
        return;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        res.status(500).json({ error: 'OpenAI API key is not set. Please check your environment variables.' });
        return;
    }

    const { projectName, projectDescription, deadline } = req.body;
    if (!projectName || !projectDescription || !deadline) {
        res.status(400).json({ error: 'Missing required fields in request body' });
        return;
    }

    const today = format(new Date(), 'yyyy-MM-dd');
    const openai = new OpenAI({ apiKey });

    const prompt = `
        Today's date is ${today}. Please create a detailed Agile/Scrum timeline for the project '${projectName}' involving '${projectDescription}', that should be completed by ${deadline}.
        Include key Agile/Scrum phases such as requirements gathering, sprint planning, development, testing, review, and deployment.
        Organize these phases to start from today and ensure all activities are planned realistically to meet the deadline of ${deadline}.
    `;

    try {
        console.log("Making OpenAI API call with model: gpt-4o");

        const response = await openai.chat.completions.create({
            model: "gpt-4o",  // Using the GPT-4o model as specified
            messages: [
                { role: "system", content: "You are a helpful assistant specializing in Agile/Scrum project management." },
                { role: "user", content: prompt }
            ]
        });

        if (response.choices.length > 0 && response.choices[0].message?.content) {
            console.log("Model used:", response.model);
            res.status(200).json({ result: response.choices[0].message.content });
        } else {
            res.status(404).json({ error: 'Failed to generate timeline. No content in response.' });
        }
    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: error.message || 'An unknown error occurred.',
            details: error.response?.data || 'No additional details available'
        });
    }
}