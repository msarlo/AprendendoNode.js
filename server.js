import Fastify from 'fastify';
import { DbMemory } from './db-memory.js';

const server = Fastify();

const banco = new DbMemory()



server.get('/', async (request, reply) => {
    return 'LILFILLGAY';
});

server.get('/fotos', () => {
    const fotos = banco.list();

    return fotos
})

server.post('/postafotos', (request, reply) => {
    const { titulo, descricao } = request.body;
    
    const fotoId = banco.create({
        titulo,
        descricao,
    });

    return reply.status(201).send({ id: fotoId });
});


server.put('/fotos/:id', () => {
    return 'Ver fotos'
})

server.delete('/fotos/:id', () => {
    return 'Ver fotos'
})

server.listen({ port: 8080 });
