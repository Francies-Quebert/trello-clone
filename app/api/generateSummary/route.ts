import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { todos } = await request.json();

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [{
            role: 'system',
            content: 'when responding greet the user as Hello Mr. Francies Welcome to the Todo app! limit it to 200 characters',
        }, {
            role: 'user',
            content: `provide the summary of the folllowinf todos, count how many todo are in each category as todo, in progress and done, then tell the user to have a productive day! here's the data ${JSON.stringify(todos)}`,
        }]
    })
    console.log(response, 'error data')
    const { data } = response
    console.log(response, 'error data')
    return NextResponse.json(data.choices[0].message)
}