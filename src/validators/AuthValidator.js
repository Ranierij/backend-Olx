const { checkSchema } = require('express-validator');

module.exports = {
    signup: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "Nome precisa ter no mínimo 2 caracteres"
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Email inválido"
        },
        password: {
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "Senha precisa ter pelo menos 2 caracteres"
        },
        state: {
            notEmpty: true,
            errorMessage: "Estado não preenchido"
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Email inválido"
        },
        password: {
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "Senha precisa ter pelo menos 2 caracteres"
        },
    })
};