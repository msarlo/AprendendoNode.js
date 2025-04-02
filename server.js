import Fastify from 'fastify';
import multer from 'multer';
import path from 'path';
import { DbMemory } from './db-memory.js';
import { randomUUID } from 'crypto';
import fs from 'fs';


if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}
const server = Fastify();

server.register(import('@fastify/multipart'));


//adicionando o servidor de arquivos estáticos
server.register(import('@fastify/static'), {
    root: path.join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
});

// Configuração do Multer para salvar os arquivos na pasta 'uploads'
const upload = multer({ dest: 'uploads/' });

// Rota de upload
server.post('/upload', async (request, reply) => {
    const parts = request.parts(); // Captura os campos do formulário
    let titulo = "";
    let descricao = "";
    let data;

    for await (const part of parts) {
        if (part.type === 'file') {
            data = part; // Captura o arquivo enviado
        } else if (part.type === 'field') {
            if (part.fieldname === 'titulo') titulo = part.value;
            if (part.fieldname === 'descricao') descricao = part.value;
        }
    }

    if (!data) {
        return reply.status(400).send({ error: 'Nenhuma imagem foi enviada.' });
    }

    const fotoId = randomUUID();
    const extensao = path.extname(data.filename);
    const novoNomeArquivo = `${fotoId}${extensao}`;
    const caminhoDestino = path.join('uploads', novoNomeArquivo);

    // Salvar arquivo corretamente
    await fs.promises.writeFile(caminhoDestino, await data.toBuffer());

    return reply.status(201).send({ 
        message: 'Upload realizado com sucesso!', 
        id: fotoId, 
        titulo,
        descricao,
        url: `http://127.0.0.1:8080/uploads/${novoNomeArquivo}`
    });
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

server.get('/fotos', async (request, reply) => {
    const arquivos = await fs.promises.readdir('uploads'); // Lista os arquivos da pasta uploads

    const fotos = arquivos.map(arquivo => ({
        url: `http://127.0.0.1:8080/uploads/${arquivo}`
    }));

    return reply.send(fotos);
});

server.put('/fotos/:id', () => {
    return 'Ver fotos'
})

server.delete('/fotos/:id', () => {
    return 'Ver fotos'
})

server.listen({ port: 8080 });
