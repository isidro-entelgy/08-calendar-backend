const { request, response } = require("express");
const { validationResult } = require("express-validator");

const crearUsuario = (req = request, res = response) => {
    const { name, email, password } = req.body;

    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).json({
            respuesta: false,
            errors: errors
        });
    }

    res.status(201).json({
        respuesta: true,
        msg: "Registro Nuevo",
        name,
        email,
        password
    })
}

const loginUsuario = (req = request, res = response) => {
    const { email, password } = req.body;

    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return res.status(400).json({
            respuesta: false,
            errors: errors
        });
    }

    res.status(201).json({
        respuesta: true,
        msg: "Login",
        email,
        password
    });
}

const renovarToken = (req = request, res = response) => {
    res.json({
        respuesta: true,
        msg: "Renovar Token"
    });
}

module.exports = {
    crearUsuario, loginUsuario, renovarToken
}