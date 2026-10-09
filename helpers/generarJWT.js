const jwt = require("jsonwebtoken");

const generarJWT = async (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: "2h"
        },
            (error, token) => {
                if (error) {
                    console.error(error);
                    reject("No se pudo generar el Token");
                }
                resolve(token);
            });
    })
}

module.exports = {
    generarJWT
}