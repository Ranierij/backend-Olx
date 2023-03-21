const { checkShema } = require('express-validator');

module.exports = {
    signup: checkShema({
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
    signin: checkShema({
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