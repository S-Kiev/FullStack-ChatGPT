import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express(); 
const port = 8080;
app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
    organization: "tu-clave-de-organizacion",
    apiKey: "tu-apikey",
});

const openai = new OpenAIApi(config);

app.post("/", async (request, response)=>{
    const {chats} = request.body;
    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "system",
            content: "Te llamas Hermes. Ayudas a estudiantes a hacer sus deberes escolares"
        },
        ...chats,
    ],
    });
    response.json({
        output: result.data.choices[0].message,
    })
})

app.listen(port, ()=>{
    console.log(`Escuchando el puerto ${port}`)
});

