import Fastify from 'fastify';
import multer from 'multer';
import path from 'path';
import { DbMemory } from './db-memory.js';
import { randomUUID } from 'crypto';
import fs from 'fs';


const server = Fastify();

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

//adicionando o servidor de arquivos estáticos
server.register(import('@fastify/static'), {
    root: path.join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
});

// Configuração do Multer para salvar os arquivos na pasta 'uploads'
const upload = multer({ dest: 'uploads/' });

// Rota de upload
server.post('/upload', { preHandler: upload.single('foto') }, (request, reply) => {
    const { titulo, descricao } = request.body;
    const foto = request.file;

    if (!foto) {
        return reply.status(400).send({ error: 'Nenhuma imagem foi enviada.' });
    }

    const fotoId = randomUUID();
    const extensao = path.extname(foto.originalname);
    const novoNomeArquivo = `${fotoId}${extensao}`;
    const caminhoDestino = path.join('uploads', novoNomeArquivo);

    fs.renameSync(foto.path, caminhoDestino);

    // Salvar no banco em memória
    const banco = new DbMemory();
    banco.create({
        id: fotoId,
        titulo,
        descricao,
        caminho: caminhoDestino,
    });

    return reply.status(201).send({ message: 'Upload realizado com sucesso!', id: fotoId, caminho: caminhoDestino });
});

server.post('/postafotos', (request, reply) => {
    const { titulo, descricao } = request.body;
    
    const fotoId = banco.create({
        titulo,
        descricao,
    });

    return reply.status(201).send({ id: fotoId });
});

server.get('/', async (request, reply) => {
    return 'LILFILLGAY';
});

server.get('/fotos', () => {
    const fotos = banco.list();

    return fotos
})

server.put('/fotos/:id', () => {
    return 'Ver fotos'
})

server.delete('/fotos/:id', () => {
    return 'Ver fotos'
})

server.listen({ port: 8080 });
