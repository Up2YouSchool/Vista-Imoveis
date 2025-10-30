const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const CorretorController = {

    // cadastro de corretor
    async create(req, res) {
        try {
            const { nome, email, senha, creci } = req.body;

            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(senha, salt);

            const novoCorretor = await prisma.corretor.create({
                data: {
                    nome,
                    email,
                    creci,
                    senha: senhaHash,
                },

                select: {
                    id: true,
                    nome: true,
                    email: true,
                    creci: true,
                    createdAt: true
                }
            });

            res.status(201).json(novoCorretor);

        } catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({ error: "Email ou CRECI já cadastrado." });
            }
            console.error("Erro ao criar corretor:", error);
            res.status(500).json({ error: "Não foi possível cadastrar o corretor." });
        }
    },

    // login de corretor
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const corretor = await prisma.corretor.findUnique({
                where: { email }
            });

            if (!corretor) {
                return res.status(401).json({ error: "Email ou senha inválidos." });
            }

            const senhaCorreta = await bcrypt.compare(senha, corretor.senha);

            if (!senhaCorreta) {
                return res.status(401).json({ error: "Email ou senha inválidos." });
            }

            const token = jwt.sign(
                { id: corretor.id, email: corretor.email },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            res.status(200).json({ token });

        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
        }
    }
};

module.exports = CorretorController;