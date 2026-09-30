const { request, response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../model/Usuario");

const crearUsuario = async (req = request, res = response) => {
    try {
        //const { name, email, password } = req.body;
        const usuario = new Usuario(req.body);
        await usuario.save();

        res.status(201).json({
            respuesta: true,
            msg: "Registro Nuevo"
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            respuesta: false,
            msg: "Por favor, hable con el Administrador"
        })
    }
}

const loginUsuario = (req = request, res = response) => {
    const { email, password } = req.body;

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