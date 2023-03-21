const { checkShema } = require('express-validator');

module.exports = {
    editAction: checkShema({
        token: {
            notEmpty: true
        },
        name: {
            optional: true,
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "Nome precisa ter no mínimo 2 caracteres"
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Email inválido"
        },
        password: {
            optional: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: "Senha precisa ter pelo menos 2 caracteres"
        },
        state: {
            optional: true,
            notEmpty: true,
            errorMessage: "Estado não preenchido"
        }
    })
};