const PROMPT = (markdown)=>{return `You are an expert in mathematics, physics, LaTeX, and related fields. I have a mathematical note and some questions for you. Please respond using only plain text and LaTeX, avoiding any Markdown formatting or special styles. Be direct and concise.

## Mathematical Note

${markdown}

## Questions

1. Summarize the equations in one sentence.
2. Complete the note or suggest next steps.
3. Solve the problem if applicable.

Less text, more math. Thank you.`};

const OLLAMA_TEST_RESPONSE = `## 1. Summary of the equation
The given differential equation is $y' = y^2$.

## 2. Completion of the note or suggestion for next steps
To proceed with solving this nonlinear differential equation, we can attempt to use separation of variables by dividing both sides by y: $\\frac{dy}{dx} = \\frac{y^2}{1}$

## 3. Solution to the problem if applicable
Solving the above equation leads to an implicit solution:
$$
\\int \\frac{dy}{y^2} = \\int dx
$$
This implies
$$
-\\frac{1}{y} = x + C_0
$$
where $C_0$ is a constant.`;

const OLLAMA_API_ENDPOINT = 'http://localhost:11434/api/chat';

function askOllama(app) {
    const id = app.hash(`0-0-${Date.now()}`.padStart(50, '0')).slice(0, 10)
    const markdown = app.getLaTeX(true);
    if(!markdown){
        alert('The content is empty, please typing some math note!');
        return;
    }

    // app.aiTakeNote(OLLAMA_TEST_RESPONSE); return;

    const generateResponse = async () => {

        const response = await fetch(OLLAMA_API_ENDPOINT, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                model: "llama3.1",
                "messages": [{
                    "role": "user",
                    "content": PROMPT(markdown)
                }]
            })
        });

        if (!response.body) {
            console.error('Response body is not a readable stream');
            return;
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let res = "";
        const processStream = async () => {
            try {
                const { done, value } = await reader.read();
                if (done) { console.log('Stream complete'); return; }
                const response = JSON.parse(decoder.decode(value, { stream: true }));
                if(response.done) {
                    console.log('Stream complete');
                    app.aiTakeNote(res, id); // only generate the note when done, since dom remove will make UX bad bad bad, like blinking...
                    return;
                }

                res += response.message.content;
                // app.aiTakeNote(res, id); 

                processStream();
            } catch (error) {
                console.error('Error reading stream:', error);
            }
        };

        processStream();
    };

    generateResponse();
}

export default askOllama;