import Fastify from 'fastify';
import { DbMemory } from './db-memory.js';

const server = Fastify();

const banco = new DbMemory()

server.get('/', async (request, reply) => {
    return 'testeando';
});

server.get('/fotos', () => {
    return 'Ver fotos'
})

server.post('/fotos', () => {
    banco.create({
        título: 'foto teste',
        descrição: 'primeira foto do banco',
    })
    
    console.log(banco.list())
})

server.put('/fotos/:id', () => {
    return 'Ver fotos'
})

server.delete('/fotos/:id', () => {
    return 'Ver fotos'
})

server.listen({ port: 8080 });
