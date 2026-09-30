const { request, response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req = request, res = response, next) => {

    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).json({
            respuesta: false,
            errors: errors
        });
    }
    next();
}

module.exports = {
    validarCampos
}