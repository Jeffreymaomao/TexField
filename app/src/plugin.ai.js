const PROMPT = (markdown)=>{return `
You are an expert in mathematics, physics, LaTeX, and related fields. I have a mathematical note and some questions for you. Please respond using only plain text and LaTeX, avoiding any Markdown formatting or special styles. Be direct and concise.

## Mathematical Note

${markdown}

## Questions

1. Summarize the equations in one sentence.
2. Complete the note or suggest next steps.
3. Solve the problem if applicable.

Less text, more math. Thank you.
`};

const OLLAMA_API_ENDPOINT = 'http://localhost:11434/api/chat';

function askOllama(app) {
    const markdown = app.getLaTeX(true);
    if(!markdown){
        alert('The content is empty, please typing some math note!');
        return;
    }

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
                res += response.message.content
                console.log(res);

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