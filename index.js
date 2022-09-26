const express = require('express');
const app = express();
const logger = require('./loggerMiddleware')
const cors = require('cors')

let notes = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
    {
        "userId": 1,
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    }
];

//usando modulo http
// const app = http.createServer((reques, response) =>{
//     response.writeHead(200, {'Content-Type': 'application/json'});
//     response.end(JSON.stringify(notes));
// });
app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (request, response) => {
    response.send('<h1>Hello World');
})

app.get('/api/notes', (request, response) => {
    console.log(request.params.id);
    response.json(notes);
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id != id);
    response.status(204).end();
})

app.post('/api/notes/', (request, response) => {
    const note = request.body;
    const ids = notes.map(note => note.id);
    const maxId = Math.max(...ids)

    const newNote = {
        "userId": 1,
        "id": maxId + 1,
        "title": "Test de nueva nota.",
        "body": `Test de nueva nota #${maxId + 1}`
    }

    notes = [...notes, newNote];

    response.status(201).json(newNote);
});

app.use((request, response) => {
    response.status(404).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server Running on: http://localhost:${PORT}`);
});
