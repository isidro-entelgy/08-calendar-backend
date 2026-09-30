/*
 Rutas de Usuarios / Auth
 host + /api/auth
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { crearUsuario, loginUsuario, renovarToken } = require("../controllers/authController")

router.post("/new",
    [check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres como mínimo").isLength({ min: 6, max: 12 })
    ],
    crearUsuario);

router.post("/", [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres como mínimo").isLength({ min: 6, max: 12 })
], loginUsuario);

router.get("/renew", renovarToken);

module.exports = router;