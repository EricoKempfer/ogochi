import FornecedorModel from '../models/FornecedorModel.js';
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await FornecedorModel.findAll({
                order: [['id', 'asc']],
            });
            return res.status(200).send({
                message: 'Registros carregados com sucesso',
                data: response,
            });
        }
        const response = await FornecedorModel.findOne({ where: { id: id } });

        if (!response) {
            return res.status(400).send({
                message: `Nenhum registro com id ${id}`,
                data: [],
            });
        }

        return res.status(200).send({
            message: 'Registro carregado com sucesso',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Ops! Ocorreu um erro',
            error: error.message,
        });
    }
};

const create = async (req, res) => {
    const { usuario, cpf, senha, cargo } = req.body;

    try {
        let hashPassword = await bcrypt.hash(senha, 10);

        console.log('Creating user with data:', { usuario, cpf, hashPassword, cargo }); // Add logging

        const response = await FornecedorModel.create({
            nome: usuario,
            cpf,
            hashPassword,
            cargo,
        });

        return res.status(200).send({
            type: 'success',
            message: 'Cadastro realizado com sucesso',
            data: response,
        });
    } catch (error) {
        console.error('Error creating user:', error); // Add logging
        return res.status(500).send({
            type: 'error',
            message: 'Erro ao realizar cadastro',
            data: error.message,
        });
    }
};

const update = async (id, res, dados = {}) => {
    try {
        const response = await FornecedorModel.findOne({ where: { id: id } });

        if (!response) {
            return res.status(400).send({
                message: `Nenhum registro com id ${id} para atualizar`,
                data: [],
            });
        }

        console.log('Updating user with data:', dados); // Add logging

        Object.keys(dados).forEach((field) => response[field] = dados[field]);

        await response.save();
        return res.status(200).send({
            message: `Registro id ${id} atualizado com sucesso`,
            data: response,
        });
    } catch (error) {
        console.error('Error updating user:', error); // Add logging
        return res.status(500).send({
            message: 'Ops! Ocorreu um erro',
            data: error.message,
        });
    }
};

const persist = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            return await create(req, res);
        }

        return await update(id, res, req.body);
    } catch (error) {
        return res.status(500).send({
            message: 'Ops! Ocorreu um erro',
            data: error.message,
        });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
        if (!id) {
            return res.status(400).send({
                message: 'Informe um id para deletar o registro',
                data: [],
            });
        }

        const response = await FornecedorModel.findOne({ where: { id: id } });
        console.log(response);

        if (!response) {
            return res.status(400).send({
                message: `Nenhum registro com id ${id} para deletar`,
                data: [],
            });
        }

        await response.destroy();
        return res.status(200).send({
            message: `Registro id ${id} deletado com sucesso`,
            data: [],
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Ops! Ocorreu um erro',
            error: error.message,
        });
    }
};
const login = async (req, res) => {
    try {
        let { nome, senha } = req.body

        let usuario = await FornecedorModel.findOne({
            where: { nome },
        })
        if (!usuario) {
            return res.status(200).send({
                type: "error",
                message: "Usuario ou senha incorretos",
            })
        }

        if (await bcrypt.compare(senha, usuario.hashPassword)) {

            const token = jwt.sign({ nome: usuario.nome,  id: usuario.id, cargo: usuario.cargo }, process.env.TOKEN_KEY, { expiresIn: '5h' });

            return res.status(200).send({
                type: "success",
                message: "Login realizado com sucesso",
                token,
            });

        } else {
            return res.status(200).send({
                type: "error",
                message: "Usuario ou senha incorretos",
            })
        }

    } catch (error) {
        return res.status(200).send({
            type: "error",
            message: "erro",
            data: error.message
        })
    }
}



export default {
    get,
    persist,
    destroy,
    login,
};