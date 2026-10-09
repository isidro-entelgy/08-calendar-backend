const { request, response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../model/Usuario");
const bcrypt = require("bcryptjs");

const crearUsuario = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con ese correo"
            });
        }

        usuario = new Usuario(req.body);

        //Encriptar la contraseña
        const salt = await bcrypt.genSalt();
        usuario.password = bcrypt.hashSync(password, salt);

        usuario.save();

        res.status(201).json({
            respuesta: true,
            uid: usuario.id,
            name: usuario.name,
            msg: "Registro Nuevo"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            respuesta: false,
            msg: "Por favor, hable con el Administrador"
        })
    }
}

const loginUsuario = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Error en email o contraseña"
            });
        }

        //Confirmar la contraseña
        const validPassword = await bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Error en email o contraseña"
            });
        }
        res.status(201).json({
            respuesta: true,
            uid: usuario.id,
            name: usuario.name,
            msg: "Acceso usuario OK"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            respuesta: false,
            msg: "Por favor, hable con el Administrador"
        })
    }
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