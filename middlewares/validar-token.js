const { request, response, next } = require("express");
const jwt = require("jsonwebtoken");

const validarToken = (request, response, next) => {

    const token = request.header("x-token");

    if (!token) {
        return response.status(401).json({
            respuesta: false,
            msg: "No hay Token en la petición"
        })
    }
    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        request.uid = uid;
        request.name = name;

    }
    catch (error) {
        return response.status(401).json({
            respuesta: false,
            msg: "Token no válido"
        })
    }
    next();
}

module.exports = {
    validarToken
}