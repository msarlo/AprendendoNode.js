import Fastify from 'fastify';
import { DbMemory } from './db-memory';

const server = Fastify();

server.get('/', async (request, reply) => {
    return 'testeando';
});

server.get('/fotos', () => {
    return 'Ver fotos'
})

server.post('/fotos', () => {
    return 'Ver fotos'
})

server.put('/fotos/:id', () => {
    return 'Ver fotos'
})

server.delete('/fotos/:id', () => {
    return 'Ver fotos'
})

server.listen({ port: 8080 });
