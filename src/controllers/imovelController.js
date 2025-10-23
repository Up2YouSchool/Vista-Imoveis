const prisma = require('../prismaClient');

const ImovelController = {

    // Criar um novo imóvel
    async create(req, res) {
        try {
            const { titulo, endereco, metros_quadrados, quartos, banheiros, preco } = req.body;
            
            const corretorId = req.userId;

            if (!corretorId) {
            return res.status(401).json({ error: "ID do corretor não encontrado no token." });
        }

            const novoImovel = await prisma.imovel.create({
                data: {
                    titulo,
                    endereco,
                    metros_quadrados,
                    quartos,
                    banheiros,
                    preco,
                    corretorId: corretorId
                }
            });

            res.status(201).json(novoImovel);

        } catch (error) {
            console.error("Erro ao criar imóvel:", error);
            res.status(500).json({ error: "Não foi possível cadastrar o imóvel." });
        }
    },

    // Listar todos os imóveis
    async listAll(req, res) {
        try {
            const imoveis = await prisma.imovel.findMany();

            res.status(200).json(imoveis);

        } catch (error) {
            console.error("Erro ao listar imóveis:", error);
            res.status(500).json({ error: "Não foi possível listar os imóveis." });
        }
    },

    // Buscar um imóvel pelo ID
    async findOne(req, res) {
        try {
            const { id } = req.params;

            const imovel = await prisma.imovel.findUnique({
                where: { id: Number(id) }
            });

            if (!imovel) {
                return res.status(404).json({ error: "Imóvel não encontrado." });
            }

            res.status(200).json(imovel);

        } catch (error) {
            console.error("Erro ao buscar imóvel:", error);
            res.status(500).json({ error: "Não foi possível buscar o imóvel." });
        }
    },

    // Atualizar um imóvel existente
    async update(req, res) {
        try {
            const { id } = req.params;

            const dadosParaAtualizar = req.body;

            const imovelAtualizado = await prisma.imovel.update({
                where: { id: Number(id) },
                data: dadosParaAtualizar
            });

            res.status(200).json(imovelAtualizado);

        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: "Imóvel não encontrado." });
            }
            console.error("Erro ao atualizar imóvel:", error);
            res.status(500).json({ error: "Não foi possível atualizar o imóvel." });
        }
    },

    // Deletar um imóvel
    async delete(req, res) {
        try {
            const { id } = req.params;

            await prisma.imovel.delete({
                where: { id: Number(id) }
            });

            res.status(204).send();

        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: "Imóvel não encontrado." });
            }
            console.error("Erro ao deletar imóvel:", error);
            res.status(500).json({ error: "Não foi possível deletar o imóvel." });
        }
    },
};

module.exports = ImovelController;